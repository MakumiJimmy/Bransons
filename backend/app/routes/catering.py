"""
Bransons Kitchen — Catering Inquiry Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import CateringInquiry, InquiryStatus
from ..schemas import CateringInquiryCreate, CateringInquiryResponse, MessageResponse

router = APIRouter(prefix="/catering", tags=["Catering"])


@router.post("/inquiries", response_model=CateringInquiryResponse, status_code=201)
def create_catering_inquiry(data: CateringInquiryCreate, db: Session = Depends(get_db)):
    """Submit a catering inquiry."""
    inquiry = CateringInquiry(
        full_name=data.full_name,
        email=data.email,
        event_date=data.event_date,
        guest_count=data.guest_count,
        preferred_package=data.preferred_package,
        details=data.details,
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.get("/inquiries", response_model=List[CateringInquiryResponse])
def list_catering_inquiries(
    status: InquiryStatus | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List all catering inquiries."""
    query = db.query(CateringInquiry)
    if status:
        query = query.filter(CateringInquiry.status == status)
    return query.order_by(CateringInquiry.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/inquiries/{inquiry_id}", response_model=CateringInquiryResponse)
def get_catering_inquiry(inquiry_id: int, db: Session = Depends(get_db)):
    """Get a specific catering inquiry."""
    inquiry = db.query(CateringInquiry).filter(CateringInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Catering inquiry not found")
    return inquiry


@router.patch("/inquiries/{inquiry_id}/status", response_model=CateringInquiryResponse)
def update_catering_inquiry_status(
    inquiry_id: int,
    status: InquiryStatus,
    db: Session = Depends(get_db),
):
    """Update catering inquiry status."""
    inquiry = db.query(CateringInquiry).filter(CateringInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Catering inquiry not found")
    inquiry.status = status
    db.commit()
    db.refresh(inquiry)
    return inquiry
