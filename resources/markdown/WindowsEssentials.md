---
title:  Active Directory Setup
description: Windows Essentials Active Directory Setup Guide
---

#  Windows Essentials Active Directory

##  Intro

Mijn Network Host gedeelte is `192.168.119.*`!

> **LET OP! Dit deel is verschillend voor iedereen!**

<br>

##  Installatie Stappenlijst

Direct na het installeren van Windows Server volg je deze stappen, van boven naar onder:
 1. Eerst VMWareTools installeren
 2. Naam veranderen van Server
 3. IP adres aanpassen van Server
 4. Als je wil kan je nu de taal veranderen en een toetsenbord zoals AZERTY toevoegen.
 5. Als laatste installeer je DNS & Active Directory

Server Key: `<KEY>`

Client Key: `<KEY>` (Niet zeker of dit echt van de client is)

Volgorde om te pingen zodat je ziet of je IP instellingen correct zijn:
- Ping Default Gateway
- Ping naar een adres buitenaf (vb. 8.8.8.8 --> DNS Google)
- Ping domain

<br>

##  VM Details

Alle IP adressen onder de `192.168.119.100` zijn bedoeld voor Servers!
Alle IP adressen hierboven zijn Clients!
  
---

Server-1:
- IP: `192.168.119.3`
- Subnet Mask: `255.255.255.0`
- Default Gateway: `192.168.119.2`
- Prefered DNS: `127.0.0.1`

Wachtwoord: `Pxl123456`

---

Workstation-1:
- IP: `192.168.119.101`
- Subnet Mask: `255.255.255.0`
- Default Gateway: `192.168.119.2`
- Prefered DNS: `192.168.119.3`
- Alternative DNS: `192.168.119.2`


Wachtwoord: `Password123!`

---

<br>

##  VMWare Instellingen

`VMWare > Edit > Virtual Network Editor > NAT > NAT Settings > Hier vind je Default Gateway`