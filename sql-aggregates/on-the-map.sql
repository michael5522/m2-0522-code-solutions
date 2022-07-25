-- select
-- "c"."name" as "country name",
-- count (*) as "total count"
-- from "cities"
-- join "countries" as "c" using ("countryId")
-- group by "c"."countryId";



select "cc"."name" as "country",
      count ("c".*) as "cities"
from "countries" as "cc"
join "cities" as "c" using ("countryId")
group by "cc"."countryId";
