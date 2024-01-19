//Eingabebereich Anfang

const maerchen = ['"Die kleine Hexe, die nicht b&ouml;se sein konnte"'];
const mt1 = ['Sa', '26', '11', '2022', '14', '30', 'Kade, "Gastst&auml;tte Pflaumbaum"']; // Erster Termin setzt den Countdown
const mt2 = ['Sa', '04', '12', '2022', '14', '30', 'Tucheim, "Zum Fiener"'];
const mt3 = ['So', '11', '12', '2022', '14', '30', "Genthin, Lindenhof"];
const mt4 = ['Sa', '17', '12', '2022', '14', '30', 'M&ouml;ckern, Stadthalle'];
const mt5 = ['Sa', '18', '12', '2022', '14', '00', 'Kirchm&ouml;ser, MGH "Die Stube"'];
const mt6 = ['Sa', '24', '12', '2021', '14', '00', 'Tucheim'];
const mt7 = ['Sa', '10', '12', '2021', '14', '00', 'Kade, "Gastst&auml;tte Pflaumbaum"'];
const mt8 = ['Sa', '24', '12', '2022', '14', '00', 'Genthin, Uhlandschule']; // Letzter Termin setzt die Überschrift

const valentin = ['Best Off "50 Jahre gat"'];
const vt1 = ['Di', '14', '02', '2023', '19', '01', 'Genthin, Lindenhof'];
const vt2 = ['So', '19', '02', '2021', '15', '00', 'Genthin, Lindenhof'];
const vt3 = ['So', '11', '12', '2021', '14', '30', 'Genthin, Lindenhof'];
const vt4 = ['So', '19', '02', '2023', '15', '30', 'Genthin, Lindenhof']; // Letzter Termin setzt die Überschrift

const strasse = ['Stra&szlig;entheater</br>"Hans Sachs"'];
const st1 = ['Sa', '04', '12', '2021', '14:30', '16', '30', 'Tucheim, "Zum Fiener"'];
const st2 = ['Sa', '10', '12', '2021', '14:30', '16', '30', 'Tucheim, "Zum Fiener"'];
const st3 = ['So', '11', '12', '2021', '14:30', '16', '30', 'Genthin, Lindenhof'];
const st4 = ['So', '02', '10', '2022', '13:00', '16', '00', 'Genthin, Lindenstra&szlige']; // Letzter Termin setzt die Überschrift

// Eingabebereich Ende !

let tn = new Date();
const t1 = new Date(mt1[3], mt1[2] - 1, mt1[1], mt1[4], mt1[5]);
const t2 = new Date(mt2[3], mt2[2] - 1, mt2[1], mt2[4], mt2[5]);
const t3 = new Date(mt3[3], mt3[2] - 1, mt3[1], mt3[4], mt3[5]);
const t4 = new Date(mt4[3], mt4[2] - 1, mt4[1], mt4[4], mt4[5]);
const t5 = new Date(mt5[3], mt5[2] - 1, mt5[1], mt5[4], mt5[5]);
const t6 = new Date(mt6[3], mt6[2] - 1, mt6[1], mt6[4], mt6[5]);
const t7 = new Date(mt7[3], mt7[2] - 1, mt7[1], mt7[4], mt7[5]);
const t8 = new Date(mt8[3], mt8[2] - 1, mt8[1], mt8[4], mt8[5]);

const tv1 = new Date(vt1[3], vt1[2] - 1, vt1[1], vt1[4], vt1[5]);
const tv2 = new Date(vt2[3], vt2[2] - 1, vt2[1], vt2[4], vt2[5]);
const tv3 = new Date(vt3[3], vt3[2] - 1, vt3[1], vt3[4], vt3[5]);
const tv4 = new Date(vt4[3], vt4[2] - 1, vt4[1], vt4[4], vt4[5]);

const ts1 = new Date(st1[3], st1[2] - 1, st1[1], st1[5], st1[6]);
const ts2 = new Date(st2[3], st2[2] - 1, st2[1], st2[5], st2[6]);
const ts3 = new Date(st3[3], st3[2] - 1, st3[1], st3[5], st3[6]);
const ts4 = new Date(st4[3], st4[2] - 1, st4[1], st4[5], st4[6]);


/*http://www-coding.de/countdown-mit-javascript-und-php/
 * Du musst hier noch einige Änderungen vornehmen. Bitte beachte die Kommentare! */
function countdown(counter) {
    window.setTimeout("countdown()", 1000);
    /* Bitte das Datum anpassen (Jahr, Monat - 1, Tag, Stunde, Minute, Sekunde)*/
    var bis = new Date(mt1[3], (mt1[2] - 1), mt1[1], mt1[4], mt1[5], 00);
    /*var bis = new Date(2022, (12 - 1), 04, 14, 30, 00);*/
    var jetzt = new Date();
    var rest = Math.floor((bis - jetzt.getTime()) / 1000);
    var wochen = 0;
    var tage = 0;
    var stunden = 0;
    var minuten = 0;

    if (rest >= 604800) {
        wochen = Math.floor(rest / 604800);
        rest -= wochen * 604800;
    }

    if (rest >= 86400) {
        tage = Math.floor(rest / 86400);
        rest -= tage * 86400;
    }

    if (rest >= 3600) {
        stunden = Math.floor(rest / 3600);
        rest -= stunden * 3600;
    }

    if (rest >= 60) {
        minuten = Math.floor(rest / 60);
        rest -= minuten * 60;
    }
    if (wochen > 1) {
        ausgabeWochen = "<b>" + wochen + "</b> Wochen,";
    } else if (wochen == 1) {
        ausgabeWochen = "<b>" + wochen + "</b> Woche,";
    } else {
        ausgabeWochen = " ";
    }
    if (tage > 1) {
        ausgabeTage = "<b> " + tage + "</b> Tage,";
    } else if (tage == 1) {
        ausgabeTage = "<b> " + tage + "</b> Tag,";
    } else {
        ausgabeTage = " ";
    }
    if (stunden > 1) {
        ausgabeStunden = "<b> " + stunden + "</b> Stunden";
    } else if (stunden == 1) {
        ausgabeStunden = "<b> " + stunden + "</b> Stunde";
    } else {
        ausgabeStunden = " ";
    }
    if (minuten > 1) {
        ausgabeMinuten = " und <b>" + minuten + "</b> Minuten";
    } else if (minuten == 1) {
        ausgabeMinuten = " und <b>" + minuten + "</b> Minute";
    } else {
        ausgabeMinuten = " ";
    }
    /* Bitte DIV-ID anpassen (countdown_div) */
    //document.getElementById('maerchen_div').innerHTML = 'Noch ' + ausgabeWochen + '' + ausgabeTage + '</br>' + ausgabeStunden + '' + ausgabeMinuten + ' ';
    // Variable Counter und Return übeergeben den Wert aus der Funktion.
    var counter = 'Noch ' + ausgabeWochen + '' + ausgabeTage + '</br>' + ausgabeStunden + '' + ausgabeMinuten + ' ';
    return counter
}


function getCountdown() {
    // Ausgabeblock Märchen
    var zeit = countdown();
    var toInsert = "";
    if (tn <= t8) {
        toInsert += ('</br></br><b>' + maerchen + '</b>');
    }
    if (tn <= t1) {
        toInsert += ('</br>' + zeit + '');
        toInsert += ('</br></br><b>' + mt1[0] + ', ' + mt1[1] + '.' + mt1[2] + '.' + mt1[3] + '</b> um <b>' + mt1[4] + ':' + mt1[5] + '</b> Uhr</br> in <b>' + mt1[6] + '</b>');
    }
    if (tn <= t2) {
        toInsert += ('</br></br><b>' + mt2[0] + ', ' + mt2[1] + '.' + mt2[2] + '.' + mt2[3] + '</b> um <b>' + mt2[4] + ':' + mt2[5] + '</b> Uhr</br> in <b>' + mt2[6] + '</b>');
    }
    if (tn <= t3) {
        toInsert += ('</br></br><b>' + mt3[0] + ', ' + mt3[1] + '.' + mt3[2] + '.' + mt3[3] + '</b> um <b>' + mt3[4] + ':' + mt3[5] + '</b> Uhr</br> in <b>' + mt3[6] + '</b>');
    }
    if (tn <= t4) {
        toInsert += ('</br></br><b>' + mt4[0] + ', ' + mt4[1] + '.' + mt4[2] + '.' + mt4[3] + '</b> um <b>' + mt4[4] + ':' + mt4[5] + '</b> Uhr</br> in <b>' + mt4[6] + '</b>');
    }
    if (tn <= t5) {
        toInsert += ('</br></br><b>' + mt5[0] + ', ' + mt5[1] + '.' + mt5[2] + '.' + mt5[3] + '</b> um <b>' + mt5[4] + ':' + mt5[5] + '</b> Uhr</br> in <b>' + mt5[6] + '</b>');
    }
    if (tn <= t6) {
        toInsert += ('</br></br><b>' + mt6[0] + ', ' + mt6[1] + '.' + mt6[2] + '.' + mt6[3] + '</b> um <b>' + mt6[4] + ':' + mt6[5] + '</b> Uhr</br> in <b>' + mt6[6] + '</b>');
    }
    if (tn <= t7) {
        toInsert += ('</br></br><b>' + mt7[0] + ', ' + mt7[1] + '.' + mt7[2] + '.' + mt7[3] + '</b> um <b>' + mt7[4] + ':' + mt7[5] + '</b> Uhr</br> in <b>' + mt7[6] + '</b>');
    }
    if (tn <= t8) {
        toInsert += ('</br></br><b>' + mt8[0] + ', ' + mt8[1] + '.' + mt8[2] + '.' + mt8[3] + '</b> um <b>' + mt8[4] + ':' + mt8[5] + '</b> Uhr</br> in <b>' + mt8[6] + '</b>');
    }
    //Ausgabeblock Vaentinade
    if (tn <= tv4) {
        toInsert += ('</br></br><b>' + valentin + '</b>');
    }
    if (tn <= tv1) {
        toInsert += ('</br></br><b>' + vt1[0] + ', ' + vt1[1] + '.' + vt1[2] + '.' + vt1[3] + '</b> um <b>' + vt1[4] + ':' + vt1[5] + '</b> Uhr</br> in <b>' + vt1[6] + '</b>');
    }
    if (tn <= tv2) {
        toInsert += ('</br></br><b>' + vt2[0] + ', ' + vt2[1] + '.' + vt2[2] + '.' + vt2[3] + '</b> um <b>' + vt2[4] + ':' + vt2[5] + '</b> Uhr</br> in <b>' + vt2[6] + '</b>');
    }
    if (tn <= tv3) {
        toInsert += ('</br></br><b>' + vt3[0] + ', ' + vt3[1] + '.' + vt3[2] + '.' + vt3[3] + '</b> um <b>' + vt3[4] + ':' + vt3[5] + '</b> Uhr</br> in <b>' + vt3[6] + '</b>');
    }
    if (tn <= tv4) {
        toInsert += ('</br></br><b>' + vt4[0] + ', ' + vt4[1] + '.' + vt4[2] + '.' + vt4[3] + '</b> um <b>' + vt4[4] + ':' + vt4[5] + '</b> Uhr</br> in <b>' + vt4[6] + '</b>');
    }
    // Ausgabeblock Straßentheater

    if (tn <= ts4) {
        toInsert += ('</br></br><b>' + strasse + '</b>');
    }
    if (tn <= ts1) {
        toInsert += ('</br></br><b>' + st1[0] + ', ' + st1[1] + '.' + st1[2] + '.' + st1[3] + '</b> von <b>' + st1[4] + ' bis ' + st1[5] + ':' + st1[6] + '</b> Uhr</br> in <b>' + st1[7] + '</b>');
    }
    if (tn <= ts2) {
        toInsert += ('</br></br><b>' + st2[0] + ', ' + st2[1] + '.' + st2[2] + '.' + st2[3] + '</b> von <b>' + st2[4] + ' bis ' + st2[5] + ':' + st2[6] + '</b> Uhr</br> in <b>' + st2[7] + '</b>');
    }
    if (tn <= ts3) {
        toInsert += ('</br></br><b>' + st3[0] + ', ' + st3[1] + '.' + st3[2] + '.' + st3[3] + '</b> von <b>' + st3[4] + ' bis ' + st3[5] + ':' + st3[6] + '</b> Uhr</br> in <b>' + st3[7] + '</b>');
    }
    if (tn <= ts4) {
        toInsert += ('</br></br><b>' + st4[0] + ', ' + st4[1] + '.' + st4[2] + '.' + st4[3] + '</b> von <b>' + st4[4] + ' bis ' + st4[5] + ':' + st4[6] + '</b> Uhr</br> in <b>' + st4[7] + '</b>');
    }

    return toInsert
}