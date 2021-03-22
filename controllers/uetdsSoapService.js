const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const uetdsSoapService = require('../middleware/uetds-soap-service/uetds-soap-service');

// @desc    POST Sefer Ekle
// @route   POST /api/v1/uetdsSoapService/seferEkle
// @access  Private
const seferEkle = asyncHandler(async (req, res, next) => {

    const { aracPlaka, seferAciklama, hareketTarihi, hareketSaati, aracTelefonu, firmaSeferNo, seferBitisTarihi, seferBitisSaati } = req.body;
    const result = await uetdsSoapService.seferEkle({ aracPlaka, seferAciklama, hareketTarihi, hareketSaati, aracTelefonu, firmaSeferNo, seferBitisTarihi, seferBitisSaati });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Sefer Guncelle
// @route   POST /api/v1/uetdsSoapService/seferGuncelle
// @access  Private
const seferGuncelle = asyncHandler(async (req, res, next) => {

    const { guncellenecekSeferReferansNo,
        aracPlaka,
        seferAciklama,
        hareketTarihi,
        hareketSaati,
        aracTelefonu,
        firmaSeferNo,
        seferBitisTarihi,
        seferBitisSaati
    } = req.body;

    const result = await uetdsSoapService.seferGuncelle({
        guncellenecekSeferReferansNo,
        aracPlaka,
        seferAciklama,
        hareketTarihi,
        hareketSaati,
        aracTelefonu,
        firmaSeferNo,
        seferBitisTarihi,
        seferBitisSaati
    });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Sefer Iptal
// @route   POST /api/v1/uetdsSoapService/seferIptal
// @access  Private
const seferIptal = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, iptalAciklama } = req.body;

    const result = await uetdsSoapService.seferIptal({ uetdsSeferReferansNo, iptalAciklama });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Sefer Iptal
// @route   POST /api/v1/uetdsSoapService/seferPlakaDegistir
// @access  Private
const seferPlakaDegistir = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, tasitPlakaNo } = req.body;

    const result = await uetdsSoapService.seferPlakaDegistir({ uetdsSeferReferansNo, tasitPlakaNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Sefer Aktif
// @route   POST /api/v1/uetdsSoapService/seferAktif
// @access  Private
const seferAktif = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, aktifAciklama } = req.body;

    const result = await uetdsSoapService.seferAktif({ uetdsSeferReferansNo, aktifAciklama });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Personel Ekle
// @route   POST /api/v1/uetdsSoapService/personelEkle
// @access  Private
const personelEkle = asyncHandler(async (req, res, next) => {

    const {
        uetdsSeferReferansNo,
        turKodu,
        uyrukUlke,
        tcKimlikPasaportno,
        cinsiyet,
        adi,
        soyadi,
        telefon,
        adres,
        hesKodu
    } = req.body;

    const result = await uetdsSoapService.personelEkle(
        {
            uetdsSeferReferansNo,
            turKodu,
            uyrukUlke,
            tcKimlikPasaportno,
            cinsiyet,
            adi,
            soyadi,
            telefon,
            adres,
            hesKodu
        });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Personel Ekle
// @route   POST /api/v1/uetdsSoapService/personelIptal
// @access  Private
const personelIptal = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, aktifAciklama } = req.body;

    const result = await uetdsSoapService.personelIptal({ uetdsSeferReferansNo, aktifAciklama });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/yolcuEkle
// @access  Private
const yolcuEkle = asyncHandler(async (req, res, next) => {

    const {
        uetdsSeferReferansNo,
        uyrukUlke,
        tcKimlikPasaportNo,
        cinsiyet,
        adi,
        soyadi,
        koltukNo,
        telefonNo,
        grupId,
        hesKodu }
        = req.body;

    const result = await uetdsSoapService.yolcuEkle({
        uetdsSeferReferansNo,
        uyrukUlke,
        tcKimlikPasaportNo,
        cinsiyet,
        adi,
        soyadi,
        koltukNo,
        telefonNo,
        grupId,
        hesKodu
    });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/yolcuEkleCoklu
// @access  Private
const yolcuEkleCoklu = asyncHandler(async (req, res, next) => {

    const tumYolcularArray = req.body;

    const result = await uetdsSoapService.yolcuEkleCoklu(tumYolcularArray);

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/yolcuIptal
// @access  Private
const yolcuIptal = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, koltukNo, yolcuTCKimlikPasaportNo, iptalAciklama } = req.body;

    const result = await uetdsSoapService.yolcuIptal({ uetdsSeferReferansNo, koltukNo, yolcuTCKimlikPasaportNo, iptalAciklama });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/yolcuIptalUetdsYolcuRefNoIle
// @access  Private
const yolcuIptalUetdsYolcuRefNoIle = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, uetdsYolcuReferansNo } = req.body;

    const result = await uetdsSoapService.yolcuIptalUetdsYolcuRefNoIle({ uetdsSeferReferansNo, uetdsYolcuReferansNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/yolcuBildirimSorgula
// @access  Private
const yolcuBildirimSorgula = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, seferYolcuRefNo } = req.body;

    const result = await uetdsSoapService.yolcuBildirimSorgula({ uetdsSeferReferansNo, seferYolcuRefNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/yolcuBildirimSorgula
// @access  Private
const seferGrupEkle = asyncHandler(async (req, res, next) => {

    const {
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
    }
        = req.body;

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

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/seferGrupGuncelle
// @access  Private
const seferGrupGuncelle = asyncHandler(async (req, res, next) => {

    const {
        uetdsSeferReferansNo,
        grupId,
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
    }
        = req.body;

    const result = await uetdsSoapService.seferGrupGuncelle({
        uetdsSeferReferansNo,
        grupId,
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

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/seferGrupIptal
// @access  Private
const seferGrupIptal = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo, grupId, iptalAciklama } = req.body;

    const result = await uetdsSoapService.seferGrupIptal({ uetdsSeferReferansNo, grupId, iptalAciklama });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/seferGrupListele
// @access  Private
const seferGrupListele = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo } = req.body;

    const result = await uetdsSoapService.seferGrupListele({ uetdsSeferReferansNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Yolcu Ekle
// @route   POST /api/v1/uetdsSoapService/seferDetayCiktisiAl
// @access  Private
const seferDetayCiktisiAl = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo } = req.body;

    const result = await uetdsSoapService.seferDetayCiktisiAl({ uetdsSeferReferansNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Bildirim Özeti
// @route   POST /api/v1/uetdsSoapService/bildirimOzeti
// @access  Private
const bildirimOzeti = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo } = req.body;

    const result = await uetdsSoapService.bildirimOzeti({ uetdsSeferReferansNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Kullanıcı Kontrol
// @route   POST /api/v1/uetdsSoapService/kullaniciKontrol
// @access  Private
const kullaniciKontrol = asyncHandler(async (req, res, next) => {

    const { uetdsSeferReferansNo } = req.body;

    const result = await uetdsSoapService.kullaniciKontrol({ uetdsSeferReferansNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Kullanıcı Kontrol
// @route   POST /api/v1/uetdsSoapService/kullaniciKontrol
// @access  Private
const yetkiBelgesiKontrol = asyncHandler(async (req, res, next) => {

    const { plaka } = req.body;

    const result = await uetdsSoapService.yetkiBelgesiKontrol({ plaka });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Kullanıcı Kontrol
// @route   POST /api/v1/uetdsSoapService/meslekiYeterlilikSorgula
// @access  Private
const meslekiYeterlilikSorgula = asyncHandler(async (req, res, next) => {

    const { kimlikNo } = req.body;

    const result = await uetdsSoapService.meslekiYeterlilikSorgula({ kimlikNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Kullanıcı Kontrol
// @route   POST /api/v1/uetdsSoapService/aracMuayeneSorgula
// @access  Private
const aracMuayeneSorgula = asyncHandler(async (req, res, next) => {

    const { plaka } = req.body;

    const result = await uetdsSoapService.aracMuayeneSorgula({ plaka });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});



// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/kimlikDogrulama
// @access  Private
const kimlikDogrulama = asyncHandler(async (req, res, next) => {

    const { kimlikNo, adi, soyadi } = req.body;

    const result = await uetdsSoapService.kimlikDogrulama({ kimlikNo, adi, soyadi });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/ipTanimla
// @access  Private
const ipTanimla = asyncHandler(async (req, res, next) => {

    const { ipBaslangic, ipBitis } = req.body;

    const result = await uetdsSoapService.ipTanimla({ ipBaslangic, ipBitis });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/ipTanimla
// @access  Private
const ipListele = asyncHandler(async (req, res, next) => {

    const result = await uetdsSoapService.ipListele();

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/ipSil
// @access  Private
const ipSil = asyncHandler(async (req, res, next) => {

    const { ipId } = req.body;

    const result = await uetdsSoapService.ipSil({ ipId });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/hesKoduKontrolEt
// @access  Private
const hesKoduKontrolEt = asyncHandler(async (req, res, next) => {

    const { hesKodu } = req.body;

    const result = await uetdsSoapService.hesKoduKontrolEt({ hesKodu });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/cokluHesKoduKontrolEt
// @access  Private
const cokluHesKoduKontrolEt = asyncHandler(async (req, res, next) => {

    const result = await uetdsSoapService.cokluHesKoduKontrolEt(req.body);

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});


// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/hesKoduBlokeEt
// @access  Private
const hesKoduBlokeEt = asyncHandler(async (req, res, next) => {

    const { hesKodu, gecerlilikTarihi, aciklama, firmaReferansNo } = req.body;

    const result = await uetdsSoapService.hesKoduBlokeEt({ hesKodu, gecerlilikTarihi, aciklama, firmaReferansNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});

// @desc    POST Kimlik Dogrulama
// @route   POST /api/v1/uetdsSoapService/hesKoduBlokeKaldir
// @access  Private
const hesKoduBlokeKaldir = asyncHandler(async (req, res, next) => {

    const { hesKodu, blokeId, firmaReferansNo } = req.body;

    const result = await uetdsSoapService.hesKoduBlokeKaldir({ hesKodu, blokeId, firmaReferansNo });

    if (result.sonucKodu != 0) {
        return next(new ErrorResponse(`${result.sonucMesaji}`, 206));
    }

    res.status(200).json({
        success: true,
        data: result
    })

});



module.exports = {
    seferEkle,
    seferGuncelle,
    seferIptal,
    seferPlakaDegistir,
    seferAktif,
    personelEkle,
    personelIptal,
    yolcuEkle,
    yolcuEkleCoklu,
    yolcuIptal,
    yolcuIptalUetdsYolcuRefNoIle,
    yolcuBildirimSorgula,
    seferGrupEkle,
    seferGrupGuncelle,
    seferGrupIptal,
    seferGrupListele,
    seferDetayCiktisiAl,
    bildirimOzeti,
    kullaniciKontrol,
    yetkiBelgesiKontrol,
    meslekiYeterlilikSorgula,
    aracMuayeneSorgula,
    kimlikDogrulama,
    ipTanimla,
    ipListele,
    ipSil,
    hesKoduKontrolEt,
    cokluHesKoduKontrolEt,
    hesKoduBlokeEt,
    hesKoduBlokeKaldir
}