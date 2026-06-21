"""
Bransons Kitchen — Reservation Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Reservation, ReservationStatus
from ..schemas import ReservationCreate, ReservationResponse, MessageResponse

router = APIRouter(prefix="/reservations", tags=["Reservations"])


@router.post("/", response_model=ReservationResponse, status_code=201)
def create_reservation(data: ReservationCreate, db: Session = Depends(get_db)):
    """Create a new table reservation."""
    reservation = Reservation(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        guests=data.guests,
        date=data.date,
        time=data.time,
        special_requests=data.special_requests,
    )
    db.add(reservation)
    db.commit()
    db.refresh(reservation)
    return reservation


@router.get("/", response_model=List[ReservationResponse])
def list_reservations(
    status: ReservationStatus | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """List all reservations, optionally filtered by status."""
    query = db.query(Reservation)
    if status:
        query = query.filter(Reservation.status == status)
    return query.order_by(Reservation.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{reservation_id}", response_model=ReservationResponse)
def get_reservation(reservation_id: int, db: Session = Depends(get_db)):
    """Get a specific reservation by ID."""
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation


@router.patch("/{reservation_id}/status", response_model=ReservationResponse)
def update_reservation_status(
    reservation_id: int,
    status: ReservationStatus,
    db: Session = Depends(get_db),
):
    """Update the status of a reservation."""
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.status = status
    db.commit()
    db.refresh(reservation)
    return reservation


@router.delete("/{reservation_id}", response_model=MessageResponse)
def delete_reservation(reservation_id: int, db: Session = Depends(get_db)):
    """Delete a reservation."""
    reservation = db.query(Reservation).filter(Reservation.id == reservation_id).first()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    db.delete(reservation)
    db.commit()
    return MessageResponse(message="Reservation deleted successfully")
