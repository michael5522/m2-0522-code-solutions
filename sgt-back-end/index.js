var express = require('express');
var app = express();
const pg = require('pg');

// only create ONE pool for your whole server
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

app.get('/api/grades/:gradeId', (req, res, next) => {
  // validate the "inputs" FIRST
  const gradeId = Number(req.params.gradeId);
  // eslint-disable-next-line no-console
  console.log('001', gradeId);
  // eslint-disable-next-line no-console
  console.log('002', typeof gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    // there is no way that a matching grade could be found
    // so we immediately respond to the client and STOP the code
    // with a return statement
    res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
    return;
  }
  // Ok, the input is reasonable, time to query the database.
  const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
     where "gradeId" = $1
  `;
  // 👆 We are NOT putting the user input directly into our query
  const params = [gradeId];
  // eslint-disable-next-line no-console
  console.log('111 params', params);
  // 👆 instead, we are sending the user input in a separate array
  /**
   * review the documentation on parameterized queries here:
   * https://node-postgres.com/features/queries#parameterized-query
   * you'll be using this information to prevent SQL injection attacks
   *
   * https://www.youtube.com/watch?v=_jKylhJtPmI
   */
  db.query(sql, params)
    .then(result => {
      // the query succeeded, even if nothing was found
      // the Result object will include an array of rows
      // see the docs on results
      // https://node-postgres.com/api/result
      const grade = result.rows[0];
      if (!grade) {
        // we could not have known ahead of time without actually querying the db
        // but the specific grade being requested was not found in the database
        res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        // the specific grade was found in the database, yay!
        res.json(grade);
      }
    })
    .catch(err => {
      // the query failed for some reason
      // possibly due to a syntax error in the SQL statement
      // print the error to STDERR (the terminal) for debugging purposes
      console.error(err);
      // respond to the client with a generic 500 error message
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/grades', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('API GRADES get ', 'ola');
  const sql = `
    select *
      from "grades"
  `;

  db.query(sql)
    .then(result => {
      const grade = result.rows;
      res.status(200).json(grade);

    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});
/// POST
///
app.post('/api/grades', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('post working');
  const newStudent = req.body;
  // eslint-disable-next-line no-console
  console.log('111', newStudent);

  if (!newStudent.name) {
    // eslint-disable-next-line no-console
    console.log('this kid has no name');
    res.status(400).json({
      error: 'must have a name'
    });
    return;
  }

  if (!newStudent.course) {
    // eslint-disable-next-line no-console
    console.log('this kid has no course');
    res.status(400).json({
      error: 'must have a course'
    });
    return;
  }

  if (!newStudent.score) {
    // eslint-disable-next-line no-console
    console.log('this kid has no score');
    res.status(400).json({
      error: 'must have a score'
    });
    return;
  }

  if (newStudent.score < 0 || newStudent.score > 100) {
    // eslint-disable-next-line no-console
    console.log('the score is either below 0 or greater than 100:--- ', newStudent.score);
    res.status(400).json({
      error: `${newStudent.score} must be a valid number`
    });
    return;
  }

  const params = [newStudent.name, newStudent.course, newStudent.score];
  // eslint-disable-next-line no-console
  console.log('params 222 ', params);
  const sql = `
    insert into "grades" ("name", "course", "score")
    values ($1,$2,$3)
    returning *;
  `;
  db.query(sql, params)
    .then(result => {
      const grade = result.rows;
      res.status(201).json(grade);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });

});
///
app.put('/api/grades/:gradeId', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('put working');
  const newStudent = req.body;
  // eslint-disable-next-line no-console
  console.log('111', newStudent);
  const gradeID = parseInt(req.params.gradeId);
  // eslint-disable-next-line no-console
  console.log('222', typeof gradeID);

  if (gradeID !== Number(gradeID) || gradeID < 1) {
    // eslint-disable-next-line no-console
    console.log('it is negative or non existant');
    res.status(400).json({
      error: 'must be greater than 0 or integer'
    });
    return;
  }

  if (!newStudent.name) {
    // eslint-disable-next-line no-console
    console.log('this kid has no name');
    res.status(400).json({
      error: 'must have a name'
    });
    return;
  }

  if (!newStudent.course) {
    // eslint-disable-next-line no-console
    console.log('this kid has no course');
    res.status(400).json({
      error: 'must have a course'
    });
    return;
  }

  if (!newStudent.score) {
    // eslint-disable-next-line no-console
    console.log('this kid has no score');
    res.status(400).json({
      error: 'must have a score'
    });
    return;
  }

  if (newStudent.score < 0 || newStudent.score > 100) {
    // eslint-disable-next-line no-console
    console.log('the score is either below 0 or greater than 100:--- ', newStudent.score);
    res.status(400).json({
      error: `${newStudent.score} must be a valid number`
    });
    // eslint-disable-next-line no-console
    console.log('need a grade');
    return;
  }

  const params = [newStudent.name, newStudent.course, newStudent.score, gradeID];
  // eslint-disable-next-line no-console
  console.log('params 222 ', params);
  const sql = `
    update "grades"
    set "name" = $1,
        "course" = $2,
        "score" = $3
    where "gradeId" = $4
    returning *;
  `;
  db.query(sql, params)
    .then(result => {
      const updatedStudent = result.rows[0];
      if (!updatedStudent) {
        res.status(404).json({
          error: ` ${gradeID} cannot be found`
        });
      } else {
        res.status(200).json(updatedStudent);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });

});
///
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
