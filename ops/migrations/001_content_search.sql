CREATE TABLE IF NOT EXISTS content_search (
  path text PRIMARY KEY,
  title text NOT NULL,
  summary text NOT NULL,
  content_type text NOT NULL,
  updated_at date NOT NULL,
  body text NOT NULL,
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'C')
  ) STORED
);

CREATE INDEX IF NOT EXISTS content_search_vector_idx ON content_search USING GIN (search_vector);
