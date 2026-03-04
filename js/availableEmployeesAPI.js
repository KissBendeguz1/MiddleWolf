/**
 * Backend API Endpoint - Available Employees by Profile Type
 *
 * This endpoint returns a list of users with 'private' profile type
 * who are NOT already in the employees table (regardless of company).
 *
 * Endpoint: POST /api/availableEmployees/private
 *
 * Request Body: {} (empty object, no parameters needed)
 *
 * Response:
 * {
 *   success: boolean,
 *   users: [
 *     {
 *       ID: number,
 *       name: string,
 *       email: string
 *     }
 *   ],
 *   message: string
 * }
 *
 * Example SQL Query:
 * SELECT ID, Name as name, Email as email
 * FROM Profilok
 * WHERE Type = 'private'
 * AND ID NOT IN (
 *   SELECT DISTINCT Profile_ID
 *   FROM Employee
 * )
 *
 * Example Node.js/Express Implementation:
 *
 * app.post('/api/availableEmployees/private', (req, res) => {
 *   const query = `
 *     SELECT ID, Name as name, Email as email
 *     FROM Profilok
 *     WHERE Type = 'private'
 *     AND ID NOT IN (
 *       SELECT DISTINCT Profile_ID
 *       FROM Employee
 *     )
 *   `;
 *
 *   db.query(query, (error, results) => {
 *     if (error) {
 *       console.error('Database error:', error);
 *       return res.status(500).json({
 *         success: false,
 *         message: 'Error fetching available employees',
 *         error: error.message
 *       });
 *     }
 *
 *     res.status(200).json({
 *       success: true,
 *       users: results,
 *       message: `Found ${results.length} available employees`
 *     });
 *   });
 * });
 *
 * SQL Database Tables Expected:
 *
 * Profilok table (profiles):
 * - ID (primary key, int)
 * - Name (varchar)
 * - Email (varchar)
 * - Mobile (varchar)
 * - Password (varchar)
 * - Type (varchar) - can be 'private', 'company', etc.
 *
 * Employee table:
 * - ID (primary key, int)
 * - Profile_ID (foreign key to Profilok.ID)
 * - Comp_ID (foreign key to Company.ID)
 * - position (varchar)
 */
