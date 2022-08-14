var express = require('express');
var app = express();
const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

app.get('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);

  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
    return;
  }
  const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
     where "gradeId" = $1
  `;
  const params = [gradeId];

  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        res.json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/grades', (req, res, next) => {
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

app.post('/api/grades', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('post working');
  const newStudent = req.body;

  if (!newStudent.name) {
    res.status(400).json({
      error: 'must have a name'
    });
    return;
  }

  if (!newStudent.course) {
    res.status(400).json({
      error: 'must have a course'
    });
    return;
  }

  if (!newStudent.score) {
    res.status(400).json({
      error: 'must have a score'
    });
    return;
  }

  if (newStudent.score < 0 || newStudent.score > 100) {
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

app.put('/api/grades/:gradeId', (req, res) => {
  const newStudent = req.body;
  const gradeID = parseInt(req.params.gradeId);

  if (gradeID !== Number(gradeID) || gradeID < 1) {
    // eslint-disable-next-line no-console
    console.log('it is negative or non existant');
    res.status(400).json({
      error: 'must be greater than 0 or integer'
    });
    return;
  }

  if (!newStudent.name) {
    res.status(400).json({
      error: 'must have a name'
    });
    return;
  }

  if (!newStudent.course) {
    res.status(400).json({
      error: 'must have a course'
    });
    return;
  }

  if (!newStudent.score) {
    res.status(400).json({
      error: 'must have a score'
    });
    return;
  }

  if (newStudent.score < 0 || newStudent.score > 100) {
    res.status(400).json({
      error: `${newStudent.score} must be a valid number`
    });
    return;
  }

  const params = [newStudent.name, newStudent.course, newStudent.score, gradeID];
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
app.delete('/api/grades/:gradeId', (req, res) => {

  const gradeID = parseInt(req.params.gradeId);

  if (gradeID !== Number(gradeID) || gradeID < 1) {

    res.status(400).json({
      error: 'must be greater than 0 or integer'
    });
    return;
  }

  const params = [gradeID];

  const sql = `
    delete from "grades"
     where "gradeId" = $1
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

        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });

});
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
