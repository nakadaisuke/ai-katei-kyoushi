alter table attempts
  add column if not exists is_quiz boolean not null default false;
