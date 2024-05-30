# Was kann geändert werden, was kann noch hinzugefügt werden ? 
+ Da es wenig Sinn ergibt, immer alle Produkte gleich zu rabattieren, wäre es nützlich, wenn die AI Zugriff auf eine Verkaufsdatenbank zu jedem Produkt hat. Gut verkaufte Produkte sollten anders heruntergesetzt werden als schlecht verkaufte Produkte. 
+ Wenn Produkte nicht gut verkauft werden, generalüberholt sind oder über längeren Zeitraum im Lager sind, beispielsweise 4 Jahre, kann für diese Produkte ein Schlussverkauf gestartet werden, wobei der Prozentsatz sehr hoch sein kann. 
+ Individuelle Angebotserstellung in Abhängigkeit von: 
    * Kaufverhalten des Käufers z.b soll analysiert werden wie lange er auf der Seite eines Produktes war, oder wie häufig er auf ein Produkt geklickt hat.
    * Vorherigen Käufen und vorherigen Einkaufswerten 
    * Auswertung von Cookies und Standort
* Rabatt als Spektrum z.b gleiches Produkt wir bei allen Kunden unterschiedlich rabattiert. 
# Was benötigen wir um das zu erreichen? 
_Merke: der folgende Code dient nur zur Veranschaulichung_

+ ## Indiviudelle Angebotserstellung
* Bei Erstellung des Accounts wird der Standort und Geschlecht zum Nutzerprofil hinzugefügt.
* Zur Auswertung von Cookies können diverse Tools genutzt werden : 
    * Cookiebot
    * OneTrust
    * Complianz 
* Dauer der Zeit auf der Produktseite kann auch durch Cookies getrackt werden.
* Vorherige Käufe werden auf dem Nutzerprofil in einer Datenbank hinterlegt.

+ ## Datenbank 
```
CREATE TABLE sales (
    product_id INT,
    units_sold INT,
    revenue DECIMAL(10, 2),
    sale_date DATE
    inventory INT,
    
);
````
+ -> Mithilfe von Datenbanken dieses Formats, das heißt sie beinhalten Verkaufszahlen, Umsatz, letztes Verkaufsdatum und Bestand ist es möglich der KI notwenidge Daten zu übergeben 
+ ## Schnittstelle mit Website und Angebotserfassung 
```
<?php
// Funktion zur Ermittlung der Anzahl verkaufter Einheiten im letzten Monat
function units_sold_last_month($product_id, $conn) {
    // Datum für den ersten Tag des letzten Monats ermitteln
    $first_day_last_month = date("Y-m-d", strtotime("first day of last month"));
    
    // Datum für den ersten Tag des aktuellen Monats ermitteln
    $first_day_current_month = date("Y-m-d", strtotime("first day of this month"));

    // SQL-Abfrage zur Ermittlung der Summe der verkauften Einheiten im letzten Monat
    $sql = "SELECT SUM(units_sold) AS total_units_sold FROM sales WHERE product_id = $product_id AND sale_date >= '$first_day_last_month' AND sale_date < '$first_day_current_month'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $total_units_sold = $row["total_units_sold"];

    return $total_units_sold ? $total_units_sold : 0;
}

// Beispielaufruf der Funktion
$product_id = 1; // ID des zu überprüfenden Produkts
$total_units_sold_last_month = units_sold_last_month($product_id, $conn);
echo "Im letzten Monat wurden $total_units_sold_last_month Einheiten des Produkts $product_id verkauft.";
?>
``` 
+ code zur Ermittlung der verkauften Einheiten im letzten Monta
```
function calculate_discount($product_id, $conn) {
    $six_months_ago = date("Y-m-d", strtotime("-6 months"));

    // Überprüfen, ob das Produkt vor mehr als 6 Monaten verkauft wurde
    $sql = "SELECT COUNT(*) AS sold_count FROM sales WHERE product_id = $product_id AND sale_date < '$six_months_ago'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $sold_count = $row["sold_count"];

    if ($sold_count > 0) {
        return 70; // Rabatt von 70% für Produkte, die vor mehr als 6 Monaten verkauft wurden
    } else {
        return 0; // Kein Rabatt für andere Produkte
    }
}

// Beispielaufruf der Funktion
$product_id = 1; // ID des zu überprüfenden Produkts
$discount = calculate_discount($product_id, $conn);
echo "Rabatt für Produkt $product_id: $discount%";
?>
```

+ Code welcher, basierend auf verkauften Einheiten, einen Rabatt ermittelt
