-- select "actorId"
-- from "actors"
-- where "firstName" = 'Lisa';

select
-- "filmId",
--         "fg"."genreId" as "genre id",
        "g"."name" as "genre",
        count(*) as "total count"
from "castMembers"
join "filmGenre" as "fg" using ("filmId")
join "genres" as "g" using ("genreId")
join "actors" as "a" using ("actorId")
where "a"."firstName" = 'Lisa' AND
      "a"."lastName" = 'Monroe'
group by "g"."name";
