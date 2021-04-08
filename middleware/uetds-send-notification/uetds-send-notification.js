const uetdsSoapService = require('../uetds-soap-service/uetds-soap-service');


const seferEkle = async (rezervation) => {
    const aracPlaka = rezervation.vehicle.plate;
    const seferAciklama = rezervation.startPoint + " - " + rezervation.endPoint;

    const hareketTarihi = new Date(rezervation.startDate).toISOString().slice(0, 10);
    const hareketSaati = new Date(rezervation.startDate).toISOString().slice(11, 16);
    const aracTelefonu = "00000000000"
    const firmaSeferNo = ""
    const seferBitisTarihi = new Date(rezervation.startDate).toISOString().slice(0, 10);

    new Date(rezervation.startDate).setUTCHours(2);
    const seferBitisSaati = new Date(rezervation.startDate).toISOString().slice(11, 16);

    const result = await uetdsSoapService.seferEkle({ aracPlaka, seferAciklama, hareketTarihi, hareketSaati, aracTelefonu, firmaSeferNo, seferBitisTarihi, seferBitisSaati });

    return result
}

const seferIptal = async (rezervation) => {
    let seferIptal = { uetdsSeferReferansNo: rezervation.uetds.refNumber, iptalAciklama: "İptal Edildi" }
    const result = await uetdsSoapService.seferIptal(seferIptal);
    return result
}

const seferGrupEkle = async (uetdsReferansNo, rezervation) => {
    const uetdsSeferReferansNo = uetdsReferansNo;
    const grupAciklama = rezervation.pax.length + " Toplam Yolcu ";
    const baslangicUlke = rezervation.uetds.baslangicUlke;
    const baslangicIl = rezervation.uetds.baslangicIl;
    const baslangicIlce = rezervation.uetds.baslangicIlce;
    const baslangicYer = rezervation.startPoint;
    const bitisUlke = rezervation.uetds.bitisUlke;
    const bitisIl = rezervation.uetds.bitisIl;
    const bitisIlce = rezervation.uetds.bitisIlce;
    const bitisYer = rezervation.endPoint;
    const grupAdi = "GRUP " + rezervation.customer.name + " " + rezervation.customer.surname;
    const grupUcret = rezervation.price;
    console.log("baslangicUlke->", baslangicUlke);
    console.log("bitisUlke->", bitisUlke);
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
            uyrukUlke: element.nationality,
            koltukNo: element.seatNo,
            telefonNo: element.phoneNo,
            hesKodu: element.hesCode,
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
            uyrukUlke: element.country.code,
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
        console.log("------------>", seferGrupResult.sonucMesaji);
    } else {
        isResult.push({ status: seferGrupResult.sonucKodu, message: seferGrupResult.sonucMesaji })
        console.log("Sefer Grup Eklendi :", seferGrupResult);
    }
    const uetdsSeferGrupID = seferGrupResult.uetdsGrupRefNo

    const yolcuEkleCokluResult = await yolcuEkleCoklu(uetdsSeferReferansNo, uetdsSeferGrupID, rezervation);
    if (yolcuEkleCokluResult.sonucKodu != 0) {
        isResult.push({ status: yolcuEkleCokluResult.sonucKodu, message: yolcuEkleCokluResult.sonucMesaji })
        console.log(yolcuEkleCokluResult.sonucMesaji);
    } else {
        isResult.push({ status: yolcuEkleCokluResult.sonucKodu, message: yolcuEkleCokluResult.sonucMesaji })
        console.log("Yolcu Çoklu Eklendi :", yolcuEkleCokluResult);
    }

    const personelEkleResult = await personelEkle(uetdsSeferReferansNo, rezervation);
    personelEkleResult.forEach((element, index, array) => {
        if (element.sonucKodu != 0) {
            isResult.push({ status: element.sonucKodu, message: element.sonucMesaji })
            console.log(element.sonucMesaji);
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

/*
const rezervation = {
    uetds: {
        status: false,
        refNumber: "21032960876172",
        groupId: "000000",
        baslangicUlke: "TR",
        baslangicIl: "48",
        baslangicIlce: "99125",
        bitisUlke: "TR",
        bitisIl: "48",
        bitisIlce: "1517",
    },
    isUetds: true,
    _id: "6060e063dfdc380744cb64b7",
    customer: {
        _id: "5d7a514b5d2c12c7449be049",
        name: "Beyaz",
        surname: "Kustak",
        email: "beyazkustak@gmail.com",
        phone: "905469189000",
        gender: "E",
        tcknOrPassport: "12345678910",
        nationality: "TR",
        createdAt: "2021-03-26T20:51:43.782Z",
        updatedAt: "2021-03-26T20:51:43.782Z",
        __v: 0
    },
    pax: [
        {
            name: "Okan",
            surname: "Koşar",
            gender: "E",
            tcknOrPassport: "12345678910",
            nationality: "TR"
        },
        {
            name: "Recep",
            surname: "Sokkan",
            gender: "E",
            tcknOrPassport: "12345678911",
            nationality: "TR"
        },
        {
            name: "Büşra",
            surname: "Canlı",
            gender: "K",
            tcknOrPassport: "12345678912",
            nationality: "TR"
        }
    ],
    transferType: "0",
    agency: {
        _id: "5ff961864658c82a84d7d5c0",
        companyName: "Akgün Transfer",
        taxAdministration: "Dalaman",
        taxNumber: 11111,
        address: "Dalaman",
        authorizedName: "Hakan",
        authorizedSurname: "Akgün",
        authorizedPhone: 905469998888,
        authorizedEmail: "hakan@gmail.com",
        companyOwner: true,
        __v: 0
    },
    vehicleType: "Mercedes Vito (6+1)",
    vehicle: {
        isRental: true,
        _id: "5ff961864658c82a84d7d5b2",
        brand: "Wolksvagen",
        model: "Transporter",
        year: 2018,
        km: 145000,
        plate: "48E1245",
        note: "Araç Notu",
        createdAt: "2021-03-26T20:51:41.618Z",
        updatedAt: "2021-03-26T20:51:41.618Z",
        __v: 0
    },
    employee: [
        {
            _id: "5ff961824658c82a84d7d5b2",
            tcknOrPassport: "44908730836",
            name: "Mert",
            surname: "Çakır",
            gender: "E",
            phone: "+905468887745",
            email: "mercakir@gmail.com",
            country: {
                _id: "5ffb2bacb79f5b2ec0d2575f",
                code: "TR",
                countryName: "Türkiye",
                __v: 0
            },
            type: "0",
            dateOfBirth: "1998-06-12T00:00:00.000Z",
            lisanceType: "B",
            lisanceNumber: "2544545",
            office: "5d713995b721c3bb38c1f5d1",
            address: "Dalaman Ege Mh Sok.91",
            createdAt: "2021-03-26T20:51:41.124Z",
            updatedAt: "2021-03-26T20:51:41.124Z",
            __v: 0
        },
        {
            _id: "5ff961824658c82a84d7d5b3",
            tcknOrPassport: "121121212122",
            name: "Recep",
            surname: "Akgun",
            gender: "E",
            phone: "+905468887745",
            email: "mercakir@gmail.com",
            country: {
                _id: "5ffb2bacb79f5b2ec0d2575f",
                code: "TR",
                countryName: "Türkiye",
                __v: 0
            },
            type: "0",
            dateOfBirth: "1998-06-12T00:00:00.000Z",
            lisanceType: "B",
            lisanceNumber: "2544545",
            office: "5d713995b721c3bb38c1f5d1",
            address: "Dalaman Ege Mh Sok.91",
            createdAt: "2021-03-26T20:51:41.124Z",
            updatedAt: "2021-03-26T20:51:41.124Z",
            __v: 0
        }
    ],
    transferDirection: "Havalimanından Noktaya",
    terminal: "İç Hatlar",
    startPoint: "Dalaman Havalimanı",
    startDate: "2021-03-30T00:00:00.000Z",
    endPoint: "Marmaris Merkez",
    flightNumber: "TK2222",
    isReturn: true,
    returnDate: "2021-04-12T00:00:00.000Z",
    babySeat: 1,
    childSeat: 0,
    wheelSeat: 0,
    note: "Note Gelecek",
    sendSms: false,
    priceCurrency: "EURO",
    driverStatus: "ÖDENMEDİ",
    status: "ÖDENDİ",
    price: 125
}

uetdsBildir(rezervation).then((data) => {
    console.log(data);
});

*/

module.exports = {
    uetdsBildir,
    uetdsIptalEt
}