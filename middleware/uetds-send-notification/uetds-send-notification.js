const uetdsSoapService = require('../uetds-soap-service/uetds-soap-service');


const seferEkle = async (rezervation) => {
    const newDate = new Date(rezervation.pickUpDateTime);
    const newDateEnd = new Date(rezervation.pickUpDateTime);    
    newDateEnd.setHours(newDate.getHours() + 2);

    const aracPlaka = rezervation.vehicle.plate;
    const seferAciklama = "";
    const hareketTarihi = newDate.toISOString().slice(0, 10);
    const hareketSaati = newDate.toISOString().slice(11, 16);
    const aracTelefonu = ""
    const firmaSeferNo = ""
    const seferBitisTarihi = newDateEnd.toISOString().slice(0, 10);
    const seferBitisSaati = newDateEnd.toISOString().slice(11, 16);

    const result = await uetdsSoapService.seferEkle({ aracPlaka, seferAciklama, hareketTarihi, hareketSaati, aracTelefonu, firmaSeferNo, seferBitisTarihi, seferBitisSaati });

    return result
}

const seferIptal = async (rezervation) => {
    let seferIptal = { uetdsSeferReferansNo: rezervation.uetdsRefNumber, iptalAciklama: "İptal Edildi" }
    const result = await uetdsSoapService.seferIptal(seferIptal);
    return result
}

const seferGrupEkle = async (uetdsReferansNo, rezervation) => {
    let tempBaslangicIl,tempBaslangicIlce,tempBaslangicYer=null
    let tempBitisIl,tempBitisIlce,tempBitisYer=null

    if(rezervation.startPoint["airport"]!== undefined){
        tempBaslangicIl=rezervation.startPoint.airport.cityCode
        tempBaslangicIlce=rezervation.startPoint.airport.code
    }

    if(rezervation.startPoint["city"]!== undefined){
        tempBaslangicIl=rezervation.startPoint.city[0].cityCode
        tempBaslangicIlce=rezervation.startPoint.city[0].code
        tempBaslangicYer=rezervation.startPoint.point
    }

    if(rezervation.endPoint["airport"]!== undefined){
        tempBitisIl=rezervation.endPoint.airport.cityCode
        tempBitisIlce=rezervation.endPoint.airport.code
    }

    if(rezervation.endPoint["city"]!== undefined){
        tempBitisIl=rezervation.endPoint.city[0].cityCode
        tempBitisIlce=rezervation.endPoint.city[0].code
        tempBitisYer=rezervation.endPoint.point
    }
    

    const uetdsSeferReferansNo = uetdsReferansNo;
    const grupAciklama = " Toplam Yolcu :"+rezervation.pax.length;
    const baslangicUlke = 'TR';
    const baslangicIl = tempBaslangicIl;
    const baslangicIlce = tempBaslangicIlce;
    const baslangicYer = tempBaslangicYer;
    const bitisUlke = 'TR';
    const bitisIl = tempBitisIl;
    const bitisIlce = tempBitisIlce;
    const bitisYer = tempBitisYer;
    const grupAdi = "GRUP " + rezervation.customer.name + " " + rezervation.customer.surname;
    const grupUcret = rezervation.uetdsPrice;
    const result = await uetdsSoapService.seferGrupEkle({
        uetdsSeferReferansNo,
        grupAciklama,
        baslangicUlke,
        baslangicIl,
        baslangicIlce,
        baslangicYer,
        bitisUlke,
        bitisIl,
        bitisIlce,
        bitisYer,
        grupAdi,
        grupUcret
    });

    return result

}

const yolcuEkleCoklu = async (uetdsSeferReferansNo, uetdsSeferGrupID, rezervation) => {

    const yolcuListesi = []
    rezervation.pax.forEach(element => {
        let newElem = {
            adi: element.name,
            soyadi: element.surname,
            cinsiyet: element.gender,
            tcKimlikPasaportNo: element.tcknOrPassport,
            uyrukUlke: element.nationality.code,
            koltukNo: '',
            telefonNo: '',
            hesKodu: '',
            grupId: uetdsSeferGrupID,
            uetdsSeferReferansNo: uetdsSeferReferansNo
        }

        yolcuListesi.push(newElem);
    });
    const result = await uetdsSoapService.yolcuEkleCoklu({ uetdsSeferReferansNo, yolcuListesi });

    return result
}

const personelEkle = async (uetdsSeferReferansNo, rezervation) => {
    let personelResult = []
    const employee = rezervation.employee
    for (let index = 0; index < employee.length; index++) {
        const element = employee[index];
        let personel = {
            uetdsSeferReferansNo: uetdsSeferReferansNo,
            turKodu: element.type,
            uyrukUlke: element.nationality.code,
            tcKimlikPasaportno: element.tcknOrPassport,
            cinsiyet: element.gender,
            adi: element.name,
            soyadi: element.surname,
            telefon: element.phone,
            adres: element.address,
            hesKodu: ""
        }

        const result = await uetdsSoapService.personelEkle(personel);
        personelResult.push(result);
        if (Object.is(employee.length - 1, index)) {
            return personelResult
        }
    }
}

const uetdsBildir = async (rezervation) => {
    let isResult = []

    const seferEkleResult = await seferEkle(rezervation);
    if (seferEkleResult.sonucKodu != 0) {
        isResult.push({ status: seferEkleResult.sonucKodu, message: seferEkleResult.sonucMesaji })
    } else {
        isResult.push({ status: seferEkleResult.sonucKodu, message: seferEkleResult.sonucMesaji })
        console.log("Sefer Eklendi :", seferEkleResult);
    }
    const uetdsSeferReferansNo = seferEkleResult.uetdsSeferReferansNo


    const seferGrupResult = await seferGrupEkle(uetdsSeferReferansNo, rezervation);
    if (seferGrupResult.sonucKodu != 0) {
        isResult.push({ status: seferGrupResult.sonucKodu, message: seferGrupResult.sonucMesaji })
        console.log("------------>**", seferGrupResult.sonucMesaji);
    } else {
        isResult.push({ status: seferGrupResult.sonucKodu, message: seferGrupResult.sonucMesaji })
        console.log("Sefer Grup Eklendi :", seferGrupResult);
    }
    const uetdsSeferGrupID = seferGrupResult.uetdsGrupRefNo

    const yolcuEkleCokluResult = await yolcuEkleCoklu(uetdsSeferReferansNo, uetdsSeferGrupID, rezervation);
    if (yolcuEkleCokluResult.sonucKodu != 0) {
        isResult.push({ status: yolcuEkleCokluResult.sonucKodu, message: yolcuEkleCokluResult.sonucMesaji })
        console.log('yolcuEkleCoklu',yolcuEkleCokluResult.sonucMesaji);
    } else {
        isResult.push({ status: yolcuEkleCokluResult.sonucKodu, message: yolcuEkleCokluResult.sonucMesaji })
        console.log("Yolcu Çoklu Eklendi :", yolcuEkleCokluResult);
    }

    const personelEkleResult = await personelEkle(uetdsSeferReferansNo, rezervation);
    console.log("personelEkleResult------ :", personelEkleResult);
    personelEkleResult.forEach((element, index, array) => {
        if (element.sonucKodu != 0) {
            isResult.push({ status: element.sonucKodu, message: element.sonucMesaji })
            console.log('Personel hata',element.sonucMesaji);
        } else {
            isResult.push({ status: element.sonucKodu, message: element.sonucMesaji })
        }
        if (Object.is(array.length - 1, index)) {
            console.log("Personel Eklendi :", array);
        }
    });

    for (let index = 0; index < isResult.length; index++) {
        const element = isResult[index];
        if (element.status != 0) {
            return {
                status: false,
                message: element.message,
                index: index
            }
        }
    }      

    return {
        status: true,
        uetdsSeferRefNo: uetdsSeferReferansNo,
        message: "OK"
    }
}

const uetdsIptalEt = async (rezervation) => {
    let isResult = []

    const seferIptalResult = await seferIptal(rezervation);
    if (seferIptalResult.sonucKodu != 0) {
        isResult.push({ status: seferIptalResult.sonucKodu, message: seferIptalResult.sonucMesaji })
    } else {
        isResult.push({ status: seferIptalResult.sonucKodu, message: seferIptalResult.sonucMesaji })
        console.log("Sefer İptal Edildi :", seferIptalResult);
    }
    console.log(isResult[0]);
    const element = isResult[0];
    if (element.status != 0) {
        return {
            status: false,
            message: element.message,
        }
    }

    return {
        status: true,
        message: "OK"
    }
}

const printOut = async (uetdsSeferReferansNo) => {
    let seferDetayCiktisiAlObject = {uetdsSeferReferansNo: uetdsSeferReferansNo} 
    const resultSeferCikti = await uetdsSoapService.seferDetayCiktisiAl(seferDetayCiktisiAlObject);
    
    if(resultSeferCikti.sonucKodu!=0){
        return {
            status: false,
            message: "HATA"
        }
    }

    return {
        status: true,
        pdf: resultSeferCikti.sonucPdf,
        message: "OK"
    }
}

const rezervation = {
    "transferType": 0,
    "vehicle": {
        "isRental": false,
        "_id": "5ff961864658c82a84d7d5b4",
        "brand": "Mercedes",
        "model": "Vito",
        "year": 2020,
        "km": 155000,
        "plate": "48 E 2133",
        "note": "Araç Notu",
        "createdAt": "2022-01-19T13:13:29.794Z",
        "updatedAt": "2022-01-19T13:13:29.794Z",
        "__v": 0
    },
    "employee": [
        {
            "phone": {
                "countryCode": "TR",
                "nationalNumber": "5469189000",
                "countryCallingCode": "90",
                "formattedNumber": "+905469189000",
                "phoneNumber": "546 918 90 00"
            },
            "nationality": {
                "code": "DE",
                "countryName": "Almanya"
            },
            "_id": "5ff961824658c82a84d7d5b1",
            "tcknOrPassport": "44908730810",
            "name": "Rıdvan",
            "surname": "Çakır",
            "gender": "E",
            "email": "ridvancakirtr@gmail.com",
            "type": 0,
            "dateOfBirth": "2000-05-18T00:00:00.000Z",
            "lisanceType": "B",
            "lisanceNumber": "25445",
            "address": "Dalaman Kapukargın Cafer Sok.25",
            "createdAt": "2022-01-19T13:13:28.546Z",
            "updatedAt": "2022-01-19T13:13:28.546Z",
            "__v": 0
        }
    ],
    "smsNotification": false,
    "uetdsNotification": true,
    "uetdsStatus": false,
    "uetdsRefNumber": '22011962445084',
    "driverStatus": 0,
    "status": 1,
    "_id": "61e80e988831252cb44c4bb9",
    "agency": {
        "authorizedPhone": {
            "countryCode": "TR",
            "nationalNumber": "5469189000",
            "countryCallingCode": "90",
            "formattedNumber": "+905469189000",
            "phoneNumber": "546 918 90 00"
        },
        "companyOwner": true,
        "_id": "5ff961864658c82a84d7d5c0",
        "companyName": "Akgün Transfer",
        "taxAdministration": "Dalaman",
        "taxNumber": 11111,
        "address": "Dalaman",
        "authorizedName": "Hakan",
        "authorizedSurname": "Akgün",
        "authorizedEmail": "hakan@gmail.com",
        "__v": 0
    },
    "vehicleType": "Mercedes Vito - 9 Kişi",
    "customer": {
        "phone": {
            "countryCode": "TR",
            "nationalNumber": "5469189000",
            "countryCallingCode": "90",
            "formattedNumber": "+905469189000",
            "phoneNumber": "546 918 90 00"
        },
        "nationality": {
            "code": "DE",
            "countryName": "Almanya"
        },
        "_id": "5d7a514b5d2c12c7449be049",
        "name": "Beyaz",
        "surname": "Kustak",
        "email": "beyazkustak@gmail.com",
        "gender": "E",
        "tcknOrPassport": "12345678910",
        "createdAt": "2022-01-19T13:13:30.546Z",
        "updatedAt": "2022-01-19T13:13:30.546Z",
        "__v": 0
    },
    "transferDirection": "0",
    "startPoint": {
        "_id": "5ffb2522f2b1541010e1c532",
        "airport": {
            "_id": "5ffb2b94b79f5b2ec0d25368",
            "code": 99151,
            "cityCode": 48,
            "name": "Milas-Bodrum Havalimanı",
            "cityName": "MUĞLA",
            "__v": 0
        },
        "__v": 0
    },
    "endPoint": {
        "point": "Güllük",
        "city": [
            {
                "_id": "5ffb2b99b79f5b2ec0d25627",
                "code": 1197,
                "cityCode": 48,
                "name": "BODRUM",
                "cityName": "MUĞLA",
                "__v": 0
            }
        ]
    },
    "flightNumber": "TK777",
    "terminal": "İç Hatlar",
    "isReturn": false,
    "pickUpDate": "2022-01-17T21:00:00.000Z",
    "pickUpTime": "2022-01-18T06:00:00.203Z",
    "dropOffDate": "2022-01-17T21:00:00.000Z",
    "dropOffTime": "2022-01-18T06:00:00.203Z",
    "babySeat": 0,
    "childSeat": 0,
    "wheelSeat": 0,
    "pax": [
        {
            "nationality": {
                "code": "TR",
                "countryName": "Türkiye"
            },
            "_id": "61e80e988831252cb44c4bba",
            "tcknOrPassport": "44908730836",
            "name": "RIDVAN",
            "surname": "CAKIR",
            "gender": "E"
        }
    ],
    "note": null,
    "price": 540,
    "uetdsPrice": 200,
    "directionPrice": 0,
    "priceCurrency": "0",
    "createdAt": "2022-01-19T13:14:00.180Z",
    "updatedAt": "2022-01-19T13:14:00.180Z",
    "__v": 0
}
/*
uetdsBildir(rezervation).then((data) => {
    console.log(data);
});

printOut("21011460312742").then((data) => {
    console.log(data);
});
*/
module.exports = {
    uetdsBildir,
    uetdsIptalEt,
    printOut
}