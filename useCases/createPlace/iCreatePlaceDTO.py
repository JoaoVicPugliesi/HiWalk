from typing import TypedDict;

class CreatePlaceDTO(TypedDict):
    name: str
    image: str
    description: str
    price: int

def validate_create_place_dto(data: dict) -> CreatePlaceDTO:
    required_fields = ["name", "image", "description", "price"]

    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
    if not all(isinstance(data[field], str) for field in ["name", "image", "description"]):
        raise TypeError("name, image, and description must be strings")
    try:
        price = int(data["price"])
    except (ValueError, TypeError):
        raise TypeError("price must be an integer or convertible to integer")

    if price > 1000:
        raise ValueError("price cannot be greater than 1000")

    return CreatePlaceDTO(
        name=data["name"],
        image=data["image"],
        description=data["description"],
        price=price,
    )