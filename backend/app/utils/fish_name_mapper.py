MODEL_TO_CSV_FISH_MAP = {
    # Pomfret
    "black pomfret": "Black pomfret",
    "pomfret": "Silver pomfret",

    # Snapper
    "black snapper": "John's Snapper",

    # Mackerel
    "hourse mackerel": "Horse Mackerel",
    "mackerel": "Mackerel",

    # Prawn / Shrimp
    "prawn": "Giant tiger prawn",
    "shrimp": "Shrimp",

    # Bream
    "gilt-head bream": "Gilt head bream",
    "red sea bream": "Red / Japanese Sea bream",

    # Carp / Rohu
    "rohu": "Rohu",
    "silver carp": "Silver Crap",   # CSV typo preserved

    # Bass
    "sea bass": "Sea Bass",

    # Mullet
    "red mullet": "Grey mullet",

    # Others
    "trout": "Trout"
}

def model_to_csv_fish_name(model_fish_name: str) -> str | None:
    """
    Convert model output fish name to CSV-compatible fish name.

    Args:
        model_fish_name (str): Output from ML model (e.g. 'black pomfret')

    Returns:
        str | None: Matching CSV fish name, or None if not supported
    """
    if not isinstance(model_fish_name, str):
        return None

    key = model_fish_name.lower().strip()
    return MODEL_TO_CSV_FISH_MAP.get(key)
