"""
Bransons Kitchen — Menu Item Routes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import MenuItem, MenuCategory
from ..schemas import MenuItemCreate, MenuItemUpdate, MenuItemResponse, MessageResponse

router = APIRouter(prefix="/menu", tags=["Menu"])


@router.get("/", response_model=List[MenuItemResponse])
def list_menu_items(
    category: str | None = None,
    special_only: bool = False,
    available_only: bool = True,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """List menu items with optional filtering."""
    query = db.query(MenuItem)
    if available_only:
        query = query.filter(MenuItem.is_available == True)
    if category:
        query = query.filter(MenuItem.category == category)
    if special_only:
        query = query.filter(MenuItem.is_special == True)
    return query.order_by(MenuItem.sort_order, MenuItem.name).offset(skip).limit(limit).all()


@router.post("/", response_model=MenuItemResponse, status_code=201)
def create_menu_item(data: MenuItemCreate, db: Session = Depends(get_db)):
    """Create a new menu item."""
    item = MenuItem(
        name=data.name,
        description=data.description,
        price=data.price,
        category=data.category,
        is_special=data.is_special,
        image_url=data.image_url,
        is_available=data.is_available,
        sort_order=data.sort_order,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/{item_id}", response_model=MenuItemResponse)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    """Get a specific menu item."""
    item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item


@router.patch("/{item_id}", response_model=MenuItemResponse)
def update_menu_item(item_id: int, data: MenuItemUpdate, db: Session = Depends(get_db)):
    """Update a menu item."""
    item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", response_model=MessageResponse)
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    """Delete a menu item."""
    item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    db.delete(item)
    db.commit()
    return MessageResponse(message="Menu item deleted successfully")
