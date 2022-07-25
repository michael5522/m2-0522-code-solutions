
select
    "c"."firstName",
    "c"."lastName",
   sum("p"."amount") as "total"
from "payments" as "p"
join "customers" as "c" using ("customerId")
group by "c"."customerId"
order by "total" desc;
