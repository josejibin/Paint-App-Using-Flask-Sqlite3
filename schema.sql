drop table if exists images;
create table images(
  id integer primary key autoincrement,
  title text not null,
  img_data text
);
