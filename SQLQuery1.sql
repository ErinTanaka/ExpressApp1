﻿insert into NetworkAccess (uname) Select 'Erin' Where not exists(select * from NetworkAccess where uname='Erin')