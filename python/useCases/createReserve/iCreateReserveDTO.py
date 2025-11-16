from typing import TypedDict

class CreateReservationDTO(TypedDict):
    place_id: int
    month: str
    starting_day: int
    ending_day: int
    days: int
    to_be_paid: int

def validate_create_reservation_dto(data: dict) -> CreateReservationDTO:
    required_fields = ["place_id", "month", "starting_day", "ending_day", "days", "to_be_paid"]

    # Verifica campos obrigatórios
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")

    # Validação do month (deve ser string)
    if not isinstance(data["month"], str):
        raise TypeError("month must be a string")

    # Validação de meses válidos (opcional, mas recomendado)
    valid_months = ["january", "february", "march", "april", "may", "june", 
                   "july", "august", "september", "october", "november", "december"]
    if data["month"].lower() not in valid_months:
        raise ValueError("month must be a valid month name")

    # Conversão e validação de campos numéricos
    try:
        place_id = int(data["place_id"])
        starting_day = int(data["starting_day"])
        ending_day = int(data["ending_day"])
        days = int(data["days"])
        to_be_paid = int(data["to_be_paid"])
    except (ValueError, TypeError):
        raise TypeError("place_id, starting_day, ending_day, days, and to_be_paid must be integers or convertible to integers")

    # Validações de lógica de negócio
    if starting_day < 1 or starting_day > 31:
        raise ValueError("starting_day must be between 1 and 31")

    if ending_day < 1 or ending_day > 31:
        raise ValueError("ending_day must be between 1 and 31")

    if starting_day > ending_day:
        raise ValueError("starting_day cannot be greater than ending_day")

    if days < 1:
        raise ValueError("days must be at least 1")

    # Verifica se o número de dias corresponde à diferença entre as datas
    calculated_days = ending_day - starting_day + 1
    if days != calculated_days:
        raise ValueError(f"days ({days}) doesn't match the period from day {starting_day} to {ending_day} ({calculated_days} days)")

    if to_be_paid < 0:
        raise ValueError("to_be_paid cannot be negative")

    return CreateReservationDTO(
        place_id=place_id,
        month=data["month"].lower(),  # Padroniza para minúsculo
        starting_day=starting_day,
        ending_day=ending_day,
        days=days,
        to_be_paid=to_be_paid,
    )