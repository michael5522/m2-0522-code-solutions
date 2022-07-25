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
where "actorId" = 178
group by "g"."name";
