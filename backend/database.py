from sqlmodel import SQLModel, create_engine, Session

# 1. The File Name
# This is where our data will physically live on the disk.
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# 2. The Engine
# The 'engine' is responsible for communicating with the database.
# It holds the connection pool and manages the "dialects" (how to speak SQL).
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

# 3. The Initialization Function
# We will call this function later to actually create the tables.
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# 4. The Session Dependency
# This is a special function for FastAPI.
# It provides a "temporary connection" (Session) for each request.
def get_session():
    with Session(engine) as session:
        yield session