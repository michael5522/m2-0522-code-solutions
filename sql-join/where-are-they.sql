select "a"."line1" as "address",
        "a"."district",
        "c"."name" as "city",
        "x"."name" as "country"
from "addresses" as "a"
join "cities" as "c" using ("cityId")
join "countries" as "x" using ("countryId");
