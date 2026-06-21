"""
Bransons Kitchen — Event Inquiry Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import EventInquiry, InquiryStatus
from ..schemas import EventInquiryCreate, EventInquiryResponse, MessageResponse

router = APIRouter(prefix="/events", tags=["Events"])


@router.post("/inquiries", response_model=EventInquiryResponse, status_code=201)
def create_event_inquiry(data: EventInquiryCreate, db: Session = Depends(get_db)):
    """Submit an event inquiry."""
    inquiry = EventInquiry(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        event_type=data.event_type,
        event_date=data.event_date,
        guest_count=data.guest_count,
        details=data.details,
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.get("/inquiries", response_model=List[EventInquiryResponse])
def list_event_inquiries(
    status: InquiryStatus | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List all event inquiries."""
    query = db.query(EventInquiry)
    if status:
        query = query.filter(EventInquiry.status == status)
    return query.order_by(EventInquiry.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/inquiries/{inquiry_id}", response_model=EventInquiryResponse)
def get_event_inquiry(inquiry_id: int, db: Session = Depends(get_db)):
    """Get a specific event inquiry."""
    inquiry = db.query(EventInquiry).filter(EventInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Event inquiry not found")
    return inquiry


@router.patch("/inquiries/{inquiry_id}/status", response_model=EventInquiryResponse)
def update_event_inquiry_status(
    inquiry_id: int,
    status: InquiryStatus,
    db: Session = Depends(get_db),
):
    """Update event inquiry status."""
    inquiry = db.query(EventInquiry).filter(EventInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Event inquiry not found")
    inquiry.status = status
    db.commit()
    db.refresh(inquiry)
    return inquiry
