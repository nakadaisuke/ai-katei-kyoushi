-- 子どもプロファイル（保護者アカウント配下）
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  grade text not null,
  created_at timestamptz not null default now()
);

-- 1問ごとの回答履歴
create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  chapter_id text not null,
  problem_id text not null,
  student_answer text not null,
  correct boolean not null,
  used_hint_levels int not null default 0,
  requested_reexplain boolean not null default false,
  duration_ms int,
  created_at timestamptz not null default now()
);

-- 章ごとの完了状態
create table if not exists chapter_progress (
  student_id uuid not null references students(id) on delete cascade,
  chapter_id text not null,
  completed_at timestamptz,
  primary key (student_id, chapter_id)
);

create index if not exists attempts_student_chapter_idx
  on attempts (student_id, chapter_id);

alter table students enable row level security;
alter table attempts enable row level security;
alter table chapter_progress enable row level security;

-- students: 自分（保護者）が作った子どもプロファイルのみ操作可能
create policy "students_select_own" on students
  for select using (parent_id = auth.uid());
create policy "students_insert_own" on students
  for insert with check (parent_id = auth.uid());
create policy "students_update_own" on students
  for update using (parent_id = auth.uid());
create policy "students_delete_own" on students
  for delete using (parent_id = auth.uid());

-- attempts: 自分の子どもプロファイルに紐づく行のみ操作可能
create policy "attempts_select_own" on attempts
  for select using (
    student_id in (select id from students where parent_id = auth.uid())
  );
create policy "attempts_insert_own" on attempts
  for insert with check (
    student_id in (select id from students where parent_id = auth.uid())
  );

-- chapter_progress: 同様
create policy "chapter_progress_select_own" on chapter_progress
  for select using (
    student_id in (select id from students where parent_id = auth.uid())
  );
create policy "chapter_progress_upsert_own" on chapter_progress
  for insert with check (
    student_id in (select id from students where parent_id = auth.uid())
  );
create policy "chapter_progress_update_own" on chapter_progress
  for update using (
    student_id in (select id from students where parent_id = auth.uid())
  );
