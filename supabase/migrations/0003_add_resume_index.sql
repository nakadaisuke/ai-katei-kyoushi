alter table chapter_progress
  add column if not exists current_index int;
