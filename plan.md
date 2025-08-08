# Plan for New Read Endpoints

This document outlines the plan to add new API endpoints to the `read` module.

## 1. API Endpoint Definitions

### 1.1. List of books a user is reading

-   **Endpoint:** `GET /reads/user/:userId`
-   **Description:** Retrieves a list of books associated with a user's reading activities.
-   **Query Parameters:**
    -   `status` (optional): Filters the books by `ReadStatus` (e.g., `UPCOMING`, `READING`, `COMPLETED`, `DROPPED`).
-   **Success Response:** `200 OK` with a JSON body containing an array of `BookSelect` objects.
-   **Error Responses:**
    -   `404 Not Found`: If the user is not found.
    -   `500 Internal Server Error`: For any other server-side errors.

### 1.2. Number of users reading a book

-   **Endpoint:** `GET /reads/book/:bookId/count`
-   **Description:** Gets the total number of users who are reading a specific book.
-   **Success Response:** `200 OK` with a JSON body like `{ "count": 123 }`.
-   **Error Responses:**
    -   `404 Not Found`: If the book is not found.
    -   `500 Internal Server Error`: For any other server-side errors.

## 2. Implementation Steps

The implementation will be broken down into the following steps, following the layers of the application architecture (Repository -> Service -> Controller -> Routes).

### Step 1: `readRepository.ts`

-   **`findBooksByUserId(userId: string, status?: ReadStatus): Promise<BookSelect[]>`**:
    -   This method will perform a database query to join the `reads` table with the `books` table.
    -   It will filter the results by `reader_id`.
    -   If the `status` parameter is provided, it will add a `WHERE` clause to filter by the read status.
    -   It will select and return the book details.

-   **`countReadersByBookId(bookId: bigint): Promise<number>`**:
    -   This method will query the `reads` table.
    -   It will count the number of entries for the given `book_id`.
    -   It will return the count as a number.

### Step 2: `readService.ts`

-   **`getBooksByUserId(userId: string, status?: ReadStatus): Promise<BookSelect[]>`**:
    -   This service method will call `readRepository.findBooksByUserId`.
    -   It can include business logic if needed in the future.

-   **`countReadersByBookId(bookId: bigint): Promise<number>`**:
    -   This service method will call `readRepository.countReadersByBookId`.

### Step 3: `readController.ts`

-   **`getBooksByUserId(req: Request, res: Response): Promise<void>`**:
    -   Extract `userId` from `req.params` and `status` from `req.query`.
    -   Call `readService.getBooksByUserId`.
    -   Send the response back to the client.

-   **`countReadersByBookId(req: Request, res: Response): Promise<void>`**:
    -   Extract `bookId` from `req.params`.
    -   Call `readService.countReadersByBookId`.
    -   Send the response back to the client.

### Step 4: `readRoutes.ts`

-   Add the new routes:
    -   `router.get('/user/:userId', readController.getBooksByUserId);`
    -   `router.get('/book/:bookId/count', readController.countReadersByBookId);`
-   Add Swagger/OpenAPI documentation for each new endpoint.

## 3. Mermaid Diagram

```mermaid
sequenceDiagram
    participant Client
    participant ExpressRouter
    participant ReadController
    participant ReadService
    participant ReadRepository
    participant Database

    Client->>+ExpressRouter: GET /reads/user/{userId}?status=READING
    ExpressRouter->>+ReadController: getBooksByUserId(req, res)
    ReadController->>+ReadService: getBooksByUserId(userId, status)
    ReadService->>+ReadRepository: findBooksByUserId(userId, status)
    ReadRepository->>+Database: SELECT books.* FROM reads JOIN books ON reads.book_id = books.id WHERE reads.reader_id = ? AND reads.status = ?
    Database-->>-ReadRepository: [BookSelect, ...]
    ReadRepository-->>-ReadService: [BookSelect, ...]
    ReadService-->>-ReadController: [BookSelect, ...]
    ReadController-->>-Client: 200 OK with [BookSelect, ...]

    Client->>+ExpressRouter: GET /reads/book/{bookId}/count
    ExpressRouter->>+ReadController: countReadersByBookId(req, res)
    ReadController->>+ReadService: countReadersByBookId(bookId)
    ReadService->>+ReadRepository: countReadersByBookId(bookId)
    ReadRepository->>+Database: SELECT COUNT(*) FROM reads WHERE book_id = ?
    Database-->>-ReadRepository: { count: 123 }
    ReadRepository-->>-ReadService: 123
    ReadService-->>-ReadController: 123
    ReadController-->>-Client: 200 OK with { count: 123 }