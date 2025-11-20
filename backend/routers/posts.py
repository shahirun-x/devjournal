from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models import Post, PostCreate, PostRead, User
from routers.auth import get_current_user # Import our Bouncer

router = APIRouter()

# 1. Create a Post
# This route is PROTECTED. Only logged-in users can post.
# We use 'response_model=PostRead' to auto-hide internal data if needed.
@router.post("/posts/", response_model=PostRead)
def create_post(
    post_data: PostCreate, 
    session: Session = Depends(get_session), 
    current_user: User = Depends(get_current_user)
):
    # We define the new post, assigning the 'user_id' automatically
    # from the logged-in user (current_user.id).
    new_post = Post.from_orm(post_data, update={"user_id": current_user.id})
    
    session.add(new_post)
    session.commit()
    session.refresh(new_post)
    return new_post

# 2. Read All Posts
# This is PUBLIC. Anyone can read posts (no get_current_user needed).
@router.get("/posts/", response_model=List[PostRead])
def read_posts(session: Session = Depends(get_session)):
    posts = session.exec(select(Post)).all()
    return posts