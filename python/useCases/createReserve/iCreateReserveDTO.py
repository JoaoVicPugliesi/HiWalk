from typing import TypedDict

class CreateReservationDTO(TypedDict):
    place_id: int
    starting_month: str
    ending_month: str | None
    starting_day: int
    ending_day: int
    days: int
    months: list[str]
    to_be_paid: int

def validate_create_reservation_dto(data: dict) -> CreateReservationDTO:
    required_fields = ['place_id', 'starting_month', 'ending_month', 'starting_day', 'ending_day', 'days', 'months', 'to_be_paid']

    # Verifica campos obrigatórios
    for field in required_fields:
        if field not in data:
            raise ValueError(f'Missing required field: {field}')
        
    valid_months = ['january', 'february', 'march', 'april', 'may', 'june', 
                   'july', 'august', 'september', 'october', 'november', 'december']
    
    # Validação do starting_month
    if not isinstance(data['starting_month'], str):
        raise TypeError('starting_month must be a string')
    if data['starting_month'].lower() not in valid_months:
        raise ValueError(f'Invalid starting_month: {data['starting_month']}')

    # Validação do ending_month 
    if data['ending_month'] is not None:
        if not isinstance(data['ending_month'], str):
            raise TypeError('ending_month must be a string or null')
        if data['ending_month'].lower() not in valid_months:
            raise ValueError(f'Invalid ending_month: {data['ending_month']}')
        
    # Validação do month (deve ser um array de strings)
    if not isinstance(data['months'], list):
        raise TypeError('months must be a list of strings')

    if not all(isinstance(m, str) for m in data['months']):
        raise TypeError('each month must be a string')

    # Validação de meses válidos (opcional, mas recomendado)
    for m in data['months']:
        if m.lower() not in valid_months:
            raise ValueError(f'Invalid month: {m}')

    # Conversão e validação de campos numéricos
    try:
        place_id = int(data['place_id'])
        starting_day = int(data['starting_day'])
        ending_day = int(data['ending_day'])
        days = int(data['days'])
        to_be_paid = int(data['to_be_paid'])
    except (ValueError, TypeError):
        raise TypeError('place_id, starting_day, ending_day, days, and to_be_paid must be integers or convertible to integers')

    # Validações de lógica de negócio
    if starting_day < 1 or starting_day > 31:
        raise ValueError('starting_day must be between 1 and 31')

    if ending_day < 1 or ending_day > 31:
        raise ValueError('ending_day must be between 1 and 31')
    
    start_month = data["starting_month"].lower()
    end_month = data["ending_month"].lower() if data["ending_month"] else start_month

    if days < 1:
        raise ValueError('days must be at least 1')

    if to_be_paid < 0:
        raise ValueError('to_be_paid cannot be negative')

    return CreateReservationDTO(
        place_id=place_id,
        starting_month=start_month,
        ending_month=end_month,
        starting_day=starting_day,
        ending_day=ending_day,
        days=days,
        months=[m.lower() for m in data['months']],
        to_be_paid=to_be_paid
    )