"""
Bransons Kitchen — SQLAlchemy Models
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, Enum as SQLEnum
from sqlalchemy.sql import func
from .database import Base
import enum


class ReservationStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"
    COMPLETED = "completed"


class InquiryStatus(str, enum.Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    RESPONDED = "responded"
    CLOSED = "closed"


class MenuCategory(str, enum.Enum):
    STARTERS = "Starters"
    MAIN_COURSES = "Main Courses"
    SEAFOOD = "Seafood"
    GRILLS = "Grills"
    DESSERTS = "Desserts"
    BEVERAGES = "Beverages"


# ─── Reservation Model ───
class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    guests = Column(String(20), nullable=False)
    date = Column(String(20), nullable=False)
    time = Column(String(20), nullable=False)
    special_requests = Column(Text, nullable=True)
    status = Column(
        SQLEnum(ReservationStatus),
        default=ReservationStatus.PENDING,
        nullable=False,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


# ─── Event Inquiry Model ───
class EventInquiry(Base):
    __tablename__ = "event_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    event_type = Column(String(100), nullable=False)
    event_date = Column(String(20), nullable=False)
    guest_count = Column(Integer, nullable=False)
    details = Column(Text, nullable=True)
    status = Column(
        SQLEnum(InquiryStatus),
        default=InquiryStatus.NEW,
        nullable=False,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


# ─── Catering Inquiry Model ───
class CateringInquiry(Base):
    __tablename__ = "catering_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    event_date = Column(String(20), nullable=False)
    guest_count = Column(Integer, nullable=False)
    preferred_package = Column(String(100), nullable=True)
    details = Column(Text, nullable=True)
    status = Column(
        SQLEnum(InquiryStatus),
        default=InquiryStatus.NEW,
        nullable=False,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


# ─── Newsletter Subscriber Model ───
class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    subscribed_at = Column(DateTime(timezone=True), server_default=func.now())
    unsubscribed_at = Column(DateTime(timezone=True), nullable=True)


# ─── Contact Message Model ───
class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# ─── Menu Item Model ───
class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    category = Column(SQLEnum(MenuCategory), nullable=False, index=True)
    is_special = Column(Boolean, default=False)
    image_url = Column(String(500), nullable=True)
    is_available = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
