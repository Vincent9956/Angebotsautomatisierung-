# Angebotsautomatisierung-
# Die "Ai" die die Angebote ertellt 
_Merke: Die Ai ist sehr simpel und nur für kleine Datenmengen (test eshop gedacht), skalierbarkeit wird nachgearbeiet._
[![Despair](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_oXv8Xnem4y3E9_m-fx9qINax6zaA-M8uAp6nyRWa4ByQtdODwAcIrQHxpne0ehcz0I&usqp=CAU)
```
const holidays = {
    Weihnachten: {
        start: '12-24',
        end: '12-26',
        discounts: {
            Haushalt: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Spielzeug: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Technik: { 1: 50, 2: 25, 3: 15, 4: 10 },
            Wohnen: { 1: 50, 2: 25, 3: 15, 4: 10 }
        }
    },
    BlackFriday: {
        start: '11-24',
        end: '11-24',
        discounts: { Technik: { 1: 50, 2: 25, 3: 15, 4: 10 } }
    },
    Thanksgiving: {
        start: '11-23',
        end: '11-23',
        discounts: { Haushalt: { 1: 50, 2: 25, 3: 15, 4: 10 } }
    },
    Ostern: {
        start: '04-09',
        end: '04-10',
        discounts: { Spielzeug: { 1: 50, 2: 25, 3: 15, 4: 10 } }
    }
};
```
# "Datenbank" der Feiertage
_Merke: Sollte der Shop und die Feiertage erweitert werden darauf, dass die AI ermittelt in welchem Land man sich befindent und welche Feiertage es dort gibt und zu jedem dieser individuellen Feiertag ein Angebot erstellt, wird es notwenidg, eine richtige Datenbank zu nutzen und nicht die Feiertage in javascript zu coden._

## Was passiert hier ? 
In diesem JavaScript-Ausschnitt wird ein Objekt namens "holidays" erstellt, das Informationen über verschiedene Feiertage enthält. Jeder Feiertag wird als Schlüssel im Objekt dargestellt, und die Werte sind jeweils Objekte, die Informationen über den Start- und Enddatum des Feiertags sowie Rabatte für verschiedene Produktkategorien enthalten.

+ Für Weihnachten gibt es Rabatte für Haushaltswaren, Spielzeug, Technik und Wohnen.
+ Für Black Friday gibt es Rabatte nur für Technik.
+ Für Thanksgiving gibt es Rabatte nur für Haushaltswaren.
+ Für Ostern gibt es Rabatte nur für Spielzeug.

Die Rabatte sind als Objekte dargestellt, wobei die Schlüssel die Anzahl der gekauften Produkte und die Werte die Rabatte in Prozent angeben."




```
function getCurrentHoliday() {
    const today = new Date();
    const formattedToday = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    for (const holiday in holidays) {
        const { start, end } = holidays[holiday];
        if (isDateInRange(formattedToday, start, end)) {
            return holiday;
        }
    }
    return null;
}

function isDateInRange(current, start, end) {
    const [currentMonth, currentDay] = current.split('-').map(Number);
    const [startMonth, startDay] = start.split('-').map(Number);
    const [endMonth, endDay] = end.split('-').map(Number);

    const currentDate = new Date(2024, currentMonth - 1, currentDay);
    const startDate = new Date(2024, startMonth - 1, startDay);
    const endDate = new Date(2024, endMonth - 1, endDay);

    return currentDate >= startDate && currentDate <= endDate;
}
```
## Was passiert hier ?
Diese beiden Funktionen arbeiten zusammen, um den aktuellen Feiertag zu ermitteln, basierend auf dem heutigen Datum und den in dem vorherigen Codeausschnitt definierten Feiertagen.

Die Funktion `getCurrentHoliday()` hat folgende Schritte:

1. Sie erstellt ein neues Date-Objekt für den heutigen Tag (`today`).
2. Sie formatiert das heutige Datum als "MM-DD" (`formattedToday`), wobei "MM" für den Monat und "DD" für den Tag stehen. Dazu werden Methoden wie `getMonth()`, `getDate()`, `toString()` und `padStart()` verwendet.
3. Sie durchläuft jede Feiertagsdefinition im Objekt `holidays` mithilfe einer Schleife.
4. Für jeden Feiertag prüft sie, ob das formatierte heutige Datum innerhalb des Bereichs dieses Feiertags liegt, indem sie die Funktion `isDateInRange()` aufruft.
5. Wenn das heutige Datum innerhalb des Bereichs eines Feiertags liegt, wird der Name des Feiertags zurückgegeben. Andernfalls wird `null` zurückgegeben.

Die Funktion `isDateInRange()` überprüft, ob ein gegebenes Datum (`current`) innerhalb eines bestimmten Zeitraums (`start` bis `end`) liegt. Dazu werden folgende Schritte durchgeführt:

1. Das aktuelle Datum, der Start- und der Enddatum werden in ihre Monate und Tage aufgeteilt und in numerische Werte umgewandelt.
2. Es werden neue Date-Objekte für das aktuelle Datum, den Start- und den Enddatum des Feiertags erstellt.
3. Es wird überprüft, ob das aktuelle Datum innerhalb des Bereichs des Feiertags liegt, indem überprüft wird, ob das aktuelle Datum größer oder gleich dem Startdatum ist und kleiner oder gleich dem Enddatum ist.
4. Das Ergebnis dieser Überprüfung wird zurückgegeben. Wenn das aktuelle Datum innerhalb des Bereichs liegt, wird `true` zurückgegeben, andernfalls wird `false` zurückgegeben.

``` 
function showCategory(category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    const currentHoliday = getCurrentHoliday();
    const discounts = currentHoliday ? holidays[currentHoliday].discounts[category] || {} : {};

    products[category].forEach(product => {
        const discount = discounts[product.range] || 0;
        const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);
        productList.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Preis: $${product.price}</p>
                ${currentHoliday ? `<p style="color:red;">Rabattierter Preis: $${discountedPrice}</p>` : ''}
                <button onclick="addToCart('${category}', ${products[category].indexOf(product)}, ${discount})">In den Warenkorb</button>
            </div>
        `;
    });
}
```
# Was passiert hier ?

Die Funktion `showCategory(category)` ist dafür verantwortlich, Produkte einer bestimmten Kategorie auf der Webseite anzuzeigen, wobei sie auch etwaige Rabatte berücksichtigt, die für den aktuellen Feiertag gelten.

Hier ist, was in dieser Funktion passiert:

1. Es wird das HTML-Element mit der ID 'product-list' aus dem Dokument geholt, das als Container für die Produktliste dient.
2. Der Inhalt dieses Containers wird zunächst geleert, um sicherzustellen, dass keine alten Produktinformationen vorhanden sind.
3. Es wird der aktuelle Feiertag ermittelt, indem die Funktion `getCurrentHoliday()` aufgerufen wird.
4. Basierend auf dem aktuellen Feiertag werden die Rabatte für die angegebene Produktkategorie aus dem Objekt `holidays` abgerufen. Wenn kein Feiertag vorhanden ist oder keine Rabatte für die angegebene Kategorie gelten, wird ein leeres Objekt verwendet.
5. Für jedes Produkt in der angegebenen Kategorie werden die zugehörigen Rabatte und der rabattierte Preis berechnet. Falls ein Rabatt für das Produkt und den aktuellen Feiertag vorhanden ist, wird der Preis entsprechend angepasst.
6. Die Produktinformationen werden in das HTML der Produktliste eingefügt. Dabei wird der Name des Produkts, der Preis, und gegebenenfalls der rabattierte Preis angezeigt. Ein Button zum Hinzufügen des Produkts zum Warenkorb wird ebenfalls angezeigt. Dies