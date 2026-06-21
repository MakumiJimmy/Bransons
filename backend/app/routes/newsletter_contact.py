"""
Bransons Kitchen — Newsletter & Contact Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List

from ..database import get_db
from ..models import NewsletterSubscriber, ContactMessage
from ..schemas import (
    NewsletterSubscribe,
    NewsletterResponse,
    ContactMessageCreate,
    ContactMessageResponse,
    MessageResponse,
)

router = APIRouter(tags=["Newsletter & Contact"])


# ─── Newsletter ───
@router.post("/newsletter/subscribe", response_model=MessageResponse, status_code=201)
def subscribe_newsletter(data: NewsletterSubscribe, db: Session = Depends(get_db)):
    """Subscribe to the newsletter."""
    # Check if already subscribed
    existing = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == data.email
    ).first()

    if existing:
        if existing.is_active:
            return MessageResponse(message="You are already subscribed!")
        # Reactivate
        existing.is_active = True
        existing.unsubscribed_at = None
        db.commit()
        return MessageResponse(message="Welcome back! Your subscription has been reactivated.")

    subscriber = NewsletterSubscriber(email=data.email)
    db.add(subscriber)
    db.commit()
    return MessageResponse(message="Successfully subscribed to the newsletter!")


@router.post("/newsletter/unsubscribe", response_model=MessageResponse)
def unsubscribe_newsletter(data: NewsletterSubscribe, db: Session = Depends(get_db)):
    """Unsubscribe from the newsletter."""
    from sqlalchemy.sql import func

    subscriber = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == data.email
    ).first()

    if not subscriber or not subscriber.is_active:
        raise HTTPException(status_code=404, detail="Email not found in subscribers")

    subscriber.is_active = False
    subscriber.unsubscribed_at = func.now()
    db.commit()
    return MessageResponse(message="Successfully unsubscribed from the newsletter.")


@router.get("/newsletter/subscribers", response_model=List[NewsletterResponse])
def list_subscribers(
    active_only: bool = True,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """List newsletter subscribers."""
    query = db.query(NewsletterSubscriber)
    if active_only:
        query = query.filter(NewsletterSubscriber.is_active == True)
    return query.order_by(NewsletterSubscriber.subscribed_at.desc()).offset(skip).limit(limit).all()


# ─── Contact ───
@router.post("/contact", response_model=ContactMessageResponse, status_code=201)
def send_contact_message(data: ContactMessageCreate, db: Session = Depends(get_db)):
    """Submit a contact message."""
    message = ContactMessage(
        full_name=data.full_name,
        email=data.email,
        subject=data.subject,
        message=data.message,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/contact/messages", response_model=List[ContactMessageResponse])
def list_contact_messages(
    unread_only: bool = False,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List contact messages."""
    query = db.query(ContactMessage)
    if unread_only:
        query = query.filter(ContactMessage.is_read == False)
    return query.order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()


@router.patch("/contact/messages/{message_id}/read", response_model=ContactMessageResponse)
def mark_message_read(message_id: int, db: Session = Depends(get_db)):
    """Mark a contact message as read."""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    message.is_read = True
    db.commit()
    db.refresh(message)
    return message
