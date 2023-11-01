# Dominik Gronkiewicz
dominikgronkiewicz@gmail.com

Remote Senior JavaScript Developer


## Ogólne

Użyte API pogodowe to http://weatherapi.com/ . Open Weather wspomniane w treści zadania wymaga podania danych karty płatniczej.

Większość mojego doświadczenia jest w części FE i w ciągu ostatnich miesięcy dość często skakałem po technologiach, ostatnio używałem głównie Solid.js oraz PayloadCMS.



## Baza danych

Pod ręką miałem akurat bazę danych PostreSQL, więc postanowiłem z niej skorzystać. Użyłem również Prisma ORM, dla przyspieszenia pracy i ułatwienia komunikacji z bazą danych.

Na początku założyłem, że będę trzymał w bazie danych dane miast i osobno dane pogody. Nie byłem pewien jak często będę musiał trzymać dane odnośnie temperatur. Dlatego zacząłem od relacji 1 do wielu między miastem, a pogodą. Właściwie, to patrząc na same UI i zewnętrzne API, mogłem te dane trzymać w 1 tabeli. Gdybym wrócił do tego zadania, to tak przerobiłbym bazę danych.

## UI

Odnośnie UI, niedawno Next.js zmienił path `/pages` na `/app`. Wcześniej zawsze korzystałem z konwencji `/pages`, jednak tutaj postanowiłem użyć ten nowszej i po drodze zaskoczyło mnie kilka innych zmian. Na początku zamierzałem użyć SSR i zrobić request w metodzie `getServerSideProps` . W nowszej konwencji request po stronie serwera dzieje się automatycznie, jednak trzeba komponent zadeklarować jako `async`. Trochę mnie to zwiodło i dla szybszego ukończenia zadania nie użyłem SSR, ale byłaby to pierwsza optymalizacja, którą bym dodał.

## Commit

W tym projekcie nie miałem wielu commitów, ale konwencja której zazwyczaj się trzymam, to `feature/{kod-taska}` oraz `bufix/{kod-taska}`.

## Dalsze kroki

Wiem, że jeszcze jednym brakującym elementem jest pobieranie danych dla wielu miast i dodałbym to z użyciem Promise.all po stronie serwera i zapisaniem wszyskich odpowiedzi do bazy danych za jednym razem. Niestety, zewnętrzne API pogodowe nie ma możliwości pobrania wielu rekordów, więc musiałbym zrobić równocześnie kilka requestów.





