# nextdrive.com

Kompleksowa aplikacja webowa do zarządzania jazdami w szkole jazdy.

## 📌 Role i uprawnienia

### Administrator

- Dodawanie i usuwanie instruktorów
- Tworzenie i edycja harmonogramu jazd
- Zarządzanie użytkownikami i statystykami
- Ustawianie maksymalnej liczby godzin przed rezerwacją
- Zatwierdzanie lub odrzucanie rezerwacji uczniów
- Zmiana trybu jazd (automatyczny/manualny)
- Zarządzanie miejscami jazd (Bródno, Bemowo, Bielany)

### Instruktor

- Widok swoich jazd i możliwość zmiany statusu (odbyta/odwołana)
- Ustawianie dostępności dni
- Zmiana jazd z automatycznych na manualne
- Dodawanie zdjęć samochodów
- Widok informacji o uczniach (przejechane godziny, kontakt, preferowane miejsca)

### Uczeń

- Rezerwacja dostępnych terminów zgodnie z ograniczeniami
- Anulowanie jazd dzień wcześniej
- Widok swoich jazd i postępów w godzinach
- Maksymalnie 2 jazdy w tygodniu
- Rezerwacje w blokach w jednym miejscu

## 📅 Ograniczenia rezerwacji

- Maksymalny czas do przodu: 1 miesiąc
- Maksymalna liczba jazd w tygodniu: 2
- System grupuje jazdy w tym samym miejscu (blok jazd)
- Rezerwacje automatyczne vs manualne:
  - **Automatyczne:** weekendy lub dopuszczone przez system miejsce/godzinę
  - **Manualne:** wymagana zgoda instruktora w tygodniu lub przy wyjątkach
- Odwołanie jazdy: tylko dzień wcześniej

## 📍 Miejsca jazd i logika map

- Każda jazda ma przypisane miejsce (Bródno, Bemowo, Bielany)
- Obliczanie czasu przejazdu między miejscami (np. Google Maps API)
- Jeśli czas przejazdu jest za długi, system blokuje automatyczne ustawienie jazdy w innym miejscu lub proponuje późniejszy termin

## 🚗 Rodzaje jazd

- **Zwykłe:** standardowe lekcje, rezerwowane automatycznie lub manualnie
- **Doszkalające:** specjalne, mogą wymagać zgody instruktora, oznaczone w harmonogramie

## 👤 Dane użytkowników

- Imię, kontakt
- Liczba godzin przejechanych
- Preferowane miejsca jazd
- Historia jazd
- Opcjonalnie: zdjęcia samochodów używanych w lekcjach

## 💻 Interfejs (frontend)

- Responsywny design (telefon + komputer)
- Widok kalendarza z kolorami dla różnych typów jazd i miejsc
- Drag & drop dla instruktorów/adminów
- Widok bloków jazd dla uczniów

## ⚙️ Backend / logika

- Sprawdzanie limitów rezerwacji tygodniowych i maks. czasu do przodu
- Automatyczne grupowanie jazd w blokach w jednym miejscu
- Rezerwacje automatyczne vs manualne
- Obsługa zdjęć samochodów (w Firebase Storage)
