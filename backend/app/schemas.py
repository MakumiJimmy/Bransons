"""
Bransons Kitchen — Pydantic Schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ─── Reservation Schemas ───
class ReservationCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    guests: str
    date: str
    time: str
    special_requests: Optional[str] = None


class ReservationResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    guests: str
    date: str
    time: str
    special_requests: Optional[str]
    status: str
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


# ─── Event Inquiry Schemas ───
class EventInquiryCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: str
    guest_count: int
    details: Optional[str] = None


class EventInquiryResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    event_type: str
    event_date: str
    guest_count: int
    details: Optional[str]
    status: str
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


# ─── Catering Inquiry Schemas ───
class CateringInquiryCreate(BaseModel):
    full_name: str
    email: EmailStr
    event_date: str
    guest_count: int
    preferred_package: Optional[str] = None
    details: Optional[str] = None


class CateringInquiryResponse(BaseModel):
    id: int
    full_name: str
    email: str
    event_date: str
    guest_count: int
    preferred_package: Optional[str]
    details: Optional[str]
    status: str
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


# ─── Newsletter Schemas ───
class NewsletterSubscribe(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    id: int
    email: str
    is_active: bool
    subscribed_at: Optional[datetime]

    class Config:
        from_attributes = True


# ─── Contact Schemas ───
class ContactMessageCreate(BaseModel):
    full_name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str


class ContactMessageResponse(BaseModel):
    id: int
    full_name: str
    email: str
    subject: Optional[str]
    message: str
    is_read: bool
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


# ─── Menu Item Schemas ───
class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    is_special: bool = False
    image_url: Optional[str] = None
    is_available: bool = True
    sort_order: int = 0


class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    is_special: Optional[bool] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None
    sort_order: Optional[int] = None


class MenuItemResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    is_special: bool
    image_url: Optional[str]
    is_available: bool
    sort_order: int
    created_at: Optional[datetime]

    class Config:
        from_attributes = True


# ─── Generic Response ───
class MessageResponse(BaseModel):
    message: str
    success: bool = True
