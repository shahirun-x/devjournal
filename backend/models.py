from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

# --- SHARED PROPERTIES ---
class UserBase(SQLModel):
    username: str
    email: str = Field(index=True, unique=True)

class PostBase(SQLModel):
    title: str
    content: str
    published: bool = True

# --- INPUT MODELS (DTOs) ---
# What the frontend sends us
class UserCreate(UserBase):
    password: str

class PostCreate(PostBase):
    pass

# --- DATABASE MODELS (Tables) ---
class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password_hash: str
    
    # Relationship: One User has Many Posts
    # "back_populates" is a magic link to the Post class
    posts: List["Post"] = Relationship(back_populates="author")

class Post(PostBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Foreign Key: This links the post to a specific User ID
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    
    # Relationship: The reverse link. This lets us say post.author.username
    author: Optional[User] = Relationship(back_populates="posts")

# --- OUTPUT MODELS (Responses) ---
# What we send back to the frontend (No Passwords!)
class UserRead(UserBase):
    id: int

class PostRead(PostBase):
    id: int
    created_at: datetime
    user_id: int