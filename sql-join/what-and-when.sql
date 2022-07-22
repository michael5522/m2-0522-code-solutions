select "releaseYear",
        "g"."name" as "genre name"
from "films"
join "filmGenre" as "fg" using ("filmId")
join "genres" as "g" using ("genreId")
where "title" = 'Boogie Amelie';
