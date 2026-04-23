// src/pages/AwarenessPage.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AwarenessPage: React.FC = () => {
  const navigate = useNavigate();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // ── TRANSLATIONS ──────────────────────────────────────────────────────────
    const translations: Record<string, Record<string, string>> = {
      mr: {
        header_tagline: 'Sagarmitr — मच्छीमारांचा मित्र',
        header_sub: 'जागरूकता • सरकारी योजना • हक्क • सुरक्षा | Awareness · Schemes · Rights · Safety',
        emergency_text: '🚨 आपत्कालीन सागर हेल्पलाइन | Sea Emergency:',
        toll_free: 'टोल फ्री',
        ticker_label: '📢 नवीन | NEW',
        ticker_text: '✦ महाराष्ट्र सरकारने मत्स्यपालनाला कृषी दर्जा दिला — 4,83,000 मच्छीमारांना फायदा ✦ किसान क्रेडिट कार्ड मर्यादा ₹5 लाख पर्यंत वाढवली (Budget 2025) ✦ PMMSY अंतर्गत विमा: अपघाती मृत्यू — ₹5 लाख मोफत संरक्षण',
        schemes_heading: 'सरकारी योजना', schemes_sub: 'Government Schemes — तुमच्यासाठी पैसे मिळवा', more_info: 'अधिक माहिती',
        pmmsy_title: 'PM मत्स्य संपदा योजना', pmmsy_sub: 'PMMSY — केंद्र सरकार', pmmsy_tag: '₹20,050 कोटी योजना',
        pmmsy_b1: 'होडी व मासेमारी साधनांवर अनुदान (Subsidy)', pmmsy_b2: 'मोफत अपघात विमा — मृत्यूस ₹5 लाख',
        pmmsy_b3: 'थंड साठवण (Cold Storage) सुविधा', pmmsy_b4: 'नवीन खोल समुद्र मासेमारी जहाज',
        pmmsy_amount: '₹5 लाख', pmmsy_amount_desc: 'अपघाती मृत्यूवर विमा — तुम्हाला काहीही भरायचे नाही', apply_now: '🌐 अर्ज करा / Apply Now',
        kcc_title: 'किसान क्रेडिट कार्ड', kcc_sub: 'KCC Fisheries — मच्छीमारांसाठी', kcc_tag: 'कमी व्याजदर',
        kcc_b1: '₹5 लाख पर्यंत कर्ज फक्त 7% व्याजाने', kcc_b2: 'वेळेत परतफेड केल्यास फक्त 4% व्याज',
        kcc_b3: 'वेळेपूर्वी जमानत नाही — ₹2 लाख पर्यंत', kcc_b4: 'होडी, जाळे, साधने खरेदी करा',
        kcc_amount: '4–7% व्याज', kcc_amount_desc: 'Budget 2025: KCC मर्यादा ₹5 लाख केली', kcc_apply: '💳 KCC अर्ज करा',
        agri_title: 'कृषी दर्जा — महाराष्ट्र', agri_sub: 'April 2025 — नवीन निर्णय', agri_tag: 'नवीन 2025',
        agri_b1: 'शेतकऱ्यांसारखेच विद्युत सवलत मिळेल', agri_b2: 'शेती दराने बँक कर्ज मिळेल',
        agri_b3: 'पूर/नैसर्गिक आपत्तीत शेतकऱ्यांसारखी मदत', agri_b4: 'माशांच्या बियाणे व खाद्यावर अनुदान',
        agri_b5: '4,83,000 मच्छीमारांना लाभ', agri_apply: '📋 अधिक माहिती',
        agri_alert: 'जिल्हा मत्स्यव्यवसाय कार्यालयाशी संपर्क करा | Contact District Fisheries Office',
        ins_title: 'मोफत अपघात विमा', ins_sub: 'Group Accidental Insurance — GAIS', ins_tag: 'मोफत | FREE',
        ins_b1: 'मृत्यू / पूर्ण अपंगत्व → ₹5,00,000', ins_b2: 'आंशिक अपंगत्व → ₹2,50,000',
        ins_b3: 'रुग्णालय खर्च → ₹25,000', ins_b4: 'प्रीमियम सरकार भरते — तुम्हाला एक पैसाही नाही',
        ins_amount: '₹0 प्रीमियम', ins_amount_desc: '13 कोटी मच्छीमारांना आधीच मिळाला लाभ', ins_apply: '🔗 नोंदणी करा',
        fidf_title: 'FIDF — पायाभूत निधी', fidf_sub: 'Fisheries Infrastructure Development Fund', fidf_tag: '3% व्याज सवलत',
        fidf_b1: 'बंदर विकास, बर्फ कारखाना, शीतगृह', fidf_b2: '3% व्याज सवलत — 12 वर्षे परतफेड',
        fidf_b3: 'मत्स्य बाजार आधुनिकीकरण', fidf_apply: '🌐 NFDB कडे अर्ज',
        mkssy_title: 'PM-MKSSY योजना', mkssy_sub: 'Matsya Kisan Samridhi Sah-Yojana', mkssy_tag: 'नवीन',
        mkssy_b1: 'मत्स्य शेतकरी नोंदणी व डिजिटल ओळख', mkssy_b2: 'बँक संस्थात्मक कर्ज सुलभतेने मिळवा',
        mkssy_b3: 'जलचर विमा (Aquaculture Insurance)', mkssy_b4: 'NFDP Portal वर नोंदणी करा', mkssy_apply: '📱 NFDP Portal',
        ban_heading: 'मासेमारी बंदी हंगाम', ban_sub: 'Fishing Ban Season — महत्त्वाची माहिती',
        ban_title: 'महाराष्ट्र — मासेमारी बंदी | Maharashtra Fishing Ban',
        ban_desc: 'माशांच्या प्रजनन काळात समुद्रात जाण्यास बंदी असते. या काळात सरकारकडून मदत मिळते. कायदा मोडल्यास दंड होतो.',
        ban_date: '🚫 15 जून – 31 जुलै (60 दिवस)', ban_allowance: '💰 बंदी भत्ता: ₹10,000 पर्यंत', ban_contact: '📞 संपर्क: जिल्हा मत्स्य कार्यालय',
        safety_heading: 'सागरी सुरक्षा नियम', safety_sub: 'Sea Safety Rules — जीव वाचवा',
        s1_title: 'Life Jacket घाला', s1_desc: 'समुद्रात जाताना नेहमी जीव रक्षक जाकीट घाला',
        s2_title: 'VHF Radio ठेवा', s2_desc: 'संपर्क यंत्रणा सोबत ठेवा — संकटात मदत मिळेल',
        s3_title: 'हवामान तपासा', s3_desc: 'सागरमित्र App मध्ये हवामान अंदाज तपासा',
        s4_title: 'कुटुंबाला सांगा', s4_desc: 'समुद्रात जाण्याआधी कुटुंबाला वेळ सांगा',
        s5_title: 'वादळात जाऊ नका', s5_desc: '🟠 पिवळा / 🔴 लाल इशारा असल्यास समुद्रात जाऊ नका',
        s6_title: 'रात्री एकट्याने नाही', s6_desc: 'एकट्याने व रात्री अनोळखी भागात जाऊ नका',
        helpline_heading: 'महत्त्वाचे हेल्पलाइन नंबर', helpline_sub: 'Important Helplines — मदतीसाठी कॉल करा',
        h1_title: 'Indian Coast Guard', h1_desc: 'सागरी आपत्कालीन मदत | Sea Emergency',
        h2_title: 'मत्स्यव्यवसाय हेल्पलाइन', h2_desc: 'सरकारी योजना माहिती | टोल फ्री',
        h3_title: 'आपत्कालीन सेवा', h3_desc: 'Police / Ambulance / Fire',
        h4_title: 'हवामान केंद्र', h4_desc: 'IMD Weather | हवामान इशारा',
        h5_title: 'किसान कॉल सेंटर', h5_desc: 'KCC / मत्स्य योजना मदत',
        h6_title: 'Elder / Widow Helpline', h6_desc: 'वृद्ध / विधवा महिला मदत',
        rights_heading: 'तुमचे हक्क', rights_sub: 'Your Rights — जाणून घ्या',
        r1_title: '⚡ वीज सवलत | Electricity Subsidy', r1_desc: 'महाराष्ट्र सरकारने मत्स्यपालनाला कृषी दर्जा दिला — तुम्हाला शेतकऱ्यांसारखे कमी दराने वीज मिळेल.',
        r2_title: '💧 किमान आधारभूत किंमत | Fair Market Price', r2_desc: 'तुमच्या माशाची योग्य किंमत मिळवण्यासाठी सागरमित्र Catch to Cash मॉड्यूल वापरा — बाजारातील योग्य दर समजेल.',
        r3_title: '🌊 नैसर्गिक आपत्तीत मदत | Disaster Relief', r3_desc: 'पूर, वादळ, चक्रीवादळात शेतकऱ्यांसारखीच नुकसानभरपाई मिळेल. जिल्हा कार्यालयात अर्ज करा.',
        r4_title: '📋 मत्स्य परवाना | Fishing License Rights', r4_desc: 'नोंदणीकृत मच्छीमाराला मासेमारी करण्याचा कायदेशीर हक्क आहे. परवान्याशिवाय कोणी अडवू शकत नाही.',
        r5_title: '🏫 मुलांचे शिक्षण | Children\'s Education', r5_desc: 'मच्छीमारांच्या मुलांना शिष्यवृत्ती व शासकीय शाळांत प्राधान्य मिळते. जिल्हा मत्स्य कार्यालयाशी संपर्क करा.',
        footer_desc: 'मच्छीमारांना सशक्त करणारे डिजिटल व्यासपीठ | Empowering Coastal Fishermen of Maharashtra<br>हवामान अंदाज • मासे ओळख • बाजार भाव • जागरूकता',
      },
      hi: {
        header_tagline: 'Sagarmitr — मछुआरों का मित्र',
        header_sub: 'जागरूकता • सरकारी योजनाएं • अधिकार • सुरक्षा',
        emergency_text: '🚨 समुद्री आपातकालीन हेल्पलाइन | Sea Emergency:',
        toll_free: 'टोल फ्री',
        ticker_label: '📢 नया | NEW',
        ticker_text: '✦ महाराष्ट्र सरकार ने मत्स्य पालन को कृषि दर्जा दिया — 4,83,000 मछुआरों को लाभ ✦ किसान क्रेडिट कार्ड सीमा ₹5 लाख तक बढ़ाई (Budget 2025) ✦ PMMSY के तहत बीमा: दुर्घटना मृत्यु — ₹5 लाख मुफ्त सुरक्षा',
        schemes_heading: 'सरकारी योजनाएं', schemes_sub: 'Government Schemes — आपके लिए धन प्राप्त करें', more_info: 'अधिक जानकारी',
        pmmsy_title: 'PM मत्स्य संपदा योजना', pmmsy_sub: 'PMMSY — केंद्र सरकार', pmmsy_tag: '₹20,050 करोड़ योजना',
        pmmsy_b1: 'नाव और मछली पकड़ने के उपकरणों पर सब्सिडी', pmmsy_b2: 'मुफ्त दुर्घटना बीमा — मृत्यु पर ₹5 लाख',
        pmmsy_b3: 'शीत भंडारण (Cold Storage) सुविधा', pmmsy_b4: 'नई गहरे समुद्र में मछली पकड़ने की नाव',
        pmmsy_amount: '₹5 लाख', pmmsy_amount_desc: 'दुर्घटना मृत्यु पर बीमा — आपको कुछ भी नहीं देना', apply_now: '🌐 आवेदन करें / Apply Now',
        kcc_title: 'किसान क्रेडिट कार्ड', kcc_sub: 'KCC Fisheries — मछुआरों के लिए', kcc_tag: 'कम ब्याज दर',
        kcc_b1: '₹5 लाख तक कर्ज सिर्फ 7% ब्याज पर', kcc_b2: 'समय पर चुकाने पर सिर्फ 4% ब्याज',
        kcc_b3: '₹2 लाख तक बिना जमानत के', kcc_b4: 'नाव, जाल, उपकरण खरीदें',
        kcc_amount: '4–7% ब्याज', kcc_amount_desc: 'Budget 2025: KCC सीमा ₹5 लाख की गई', kcc_apply: '💳 KCC आवेदन करें',
        agri_title: 'कृषि दर्जा — महाराष्ट्र', agri_sub: 'अप्रैल 2025 — नया निर्णय', agri_tag: 'नया 2025',
        agri_b1: 'किसानों जैसी बिजली छूट मिलेगी', agri_b2: 'कृषि दर पर बैंक से कर्ज मिलेगा',
        agri_b3: 'बाढ़/प्राकृतिक आपदा में किसानों जैसी मदद', agri_b4: 'मछली के बीज व चारे पर सब्सिडी',
        agri_b5: '4,83,000 मछुआरों को लाभ', agri_apply: '📋 अधिक जानकारी',
        agri_alert: 'जिला मत्स्य कार्यालय से संपर्क करें | Contact District Fisheries Office',
        ins_title: 'मुफ्त दुर्घटना बीमा', ins_sub: 'Group Accidental Insurance — GAIS', ins_tag: 'मुफ्त | FREE',
        ins_b1: 'मृत्यु / पूर्ण विकलांगता → ₹5,00,000', ins_b2: 'आंशिक विकलांगता → ₹2,50,000',
        ins_b3: 'अस्पताल खर्च → ₹25,000', ins_b4: 'प्रीमियम सरकार भरती है — आपको एक पैसा भी नहीं',
        ins_amount: '₹0 प्रीमियम', ins_amount_desc: '13 करोड़ मछुआरों को पहले ही मिला लाभ', ins_apply: '🔗 पंजीकरण करें',
        fidf_title: 'FIDF — बुनियादी ढांचा निधि', fidf_sub: 'Fisheries Infrastructure Development Fund', fidf_tag: '3% ब्याज छूट',
        fidf_b1: 'बंदरगाह विकास, बर्फ कारखाना, शीतगृह', fidf_b2: '3% ब्याज छूट — 12 साल चुकाने की सुविधा',
        fidf_b3: 'मत्स्य बाजार आधुनिकीकरण', fidf_apply: '🌐 NFDB में आवेदन',
        mkssy_title: 'PM-MKSSY योजना', mkssy_sub: 'Matsya Kisan Samridhi Sah-Yojana', mkssy_tag: 'नया',
        mkssy_b1: 'मत्स्य किसान पंजीकरण व डिजिटल पहचान', mkssy_b2: 'बैंक से संस्थागत कर्ज आसानी से पाएं',
        mkssy_b3: 'जलकृषि बीमा (Aquaculture Insurance)', mkssy_b4: 'NFDP Portal पर पंजीकरण करें', mkssy_apply: '📱 NFDP Portal',
        ban_heading: 'मछली पकड़ने पर प्रतिबंध का मौसम', ban_sub: 'Fishing Ban Season — महत्वपूर्ण जानकारी',
        ban_title: 'महाराष्ट्र — मछली पकड़ने पर प्रतिबंध | Maharashtra Fishing Ban',
        ban_desc: 'मछलियों के प्रजनन काल में समुद्र में जाने पर प्रतिबंध होता है। इस दौरान सरकार से मदद मिलती है। कानून तोड़ने पर जुर्माना लगता है।',
        ban_date: '🚫 15 जून – 31 जुलाई (60 दिन)', ban_allowance: '💰 प्रतिबंध भत्ता: ₹10,000 तक', ban_contact: '📞 संपर्क: जिला मत्स्य कार्यालय',
        safety_heading: 'समुद्री सुरक्षा नियम', safety_sub: 'Sea Safety Rules — जीव बचाएं',
        s1_title: 'Life Jacket पहनें', s1_desc: 'समुद्र में जाते समय हमेशा लाइफ जैकेट पहनें',
        s2_title: 'VHF Radio रखें', s2_desc: 'संचार उपकरण साथ रखें — संकट में मदद मिलेगी',
        s3_title: 'मौसम जांचें', s3_desc: 'Sagarmitr App में मौसम पूर्वानुमान देखें',
        s4_title: 'परिवार को बताएं', s4_desc: 'समुद्र में जाने से पहले परिवार को समय बताएं',
        s5_title: 'तूफान में न जाएं', s5_desc: '🟠 पीला / 🔴 लाल अलर्ट हो तो समुद्र में न जाएं',
        s6_title: 'रात को अकेले नहीं', s6_desc: 'अकेले व रात को अनजान जगह पर न जाएं',
        helpline_heading: 'महत्वपूर्ण हेल्पलाइन नंबर', helpline_sub: 'Important Helplines — मदद के लिए कॉल करें',
        h1_title: 'Indian Coast Guard', h1_desc: 'समुद्री आपातकालीन मदद | Sea Emergency',
        h2_title: 'मत्स्य व्यवसाय हेल्पलाइन', h2_desc: 'सरकारी योजना जानकारी | टोल फ्री',
        h3_title: 'आपातकालीन सेवाएं', h3_desc: 'Police / Ambulance / Fire',
        h4_title: 'मौसम केंद्र', h4_desc: 'IMD Weather | मौसम अलर्ट',
        h5_title: 'किसान कॉल सेंटर', h5_desc: 'KCC / मत्स्य योजना सहायता',
        h6_title: 'Elder / Widow Helpline', h6_desc: 'वृद्ध / विधवा महिला सहायता',
        rights_heading: 'आपके अधिकार', rights_sub: 'Your Rights — जानें',
        r1_title: '⚡ बिजली सब्सिडी | Electricity Subsidy', r1_desc: 'महाराष्ट्र सरकार ने मत्स्य पालन को कृषि दर्जा दिया — आपको किसानों की तरह कम दर पर बिजली मिलेगी।',
        r2_title: '💧 उचित बाजार मूल्य | Fair Market Price', r2_desc: 'मछली का सही दाम पाने के लिए Sagarmitr Catch to Cash मॉड्यूल का उपयोग करें।',
        r3_title: '🌊 प्राकृतिक आपदा में मदद | Disaster Relief', r3_desc: 'बाढ़, तूफान, चक्रवात में किसानों जैसा मुआवजा मिलेगा। जिला कार्यालय में आवेदन करें।',
        r4_title: '📋 मछली पकड़ने का लाइसेंस | Fishing License Rights', r4_desc: 'पंजीकृत मछुआरे को मछली पकड़ने का कानूनी अधिकार है। लाइसेंस के बिना कोई नहीं रोक सकता।',
        r5_title: '🏫 बच्चों की शिक्षा | Children\'s Education', r5_desc: 'मछुआरों के बच्चों को छात्रवृत्ति व सरकारी स्कूलों में प्राथमिकता मिलती है।',
        footer_desc: 'मछुआरों को सशक्त करने वाला डिजिटल मंच | Empowering Coastal Fishermen of Maharashtra<br>मौसम पूर्वानुमान • मछली पहचान • बाजार भाव • जागरूकता',
      },
      en: {
        header_tagline: 'Sagarmitr — Friend of Fishermen',
        header_sub: 'Awareness · Government Schemes · Rights · Safety',
        emergency_text: '🚨 Sea Emergency Helpline:',
        toll_free: 'Toll Free',
        ticker_label: '📢 NEW',
        ticker_text: '✦ Maharashtra grants Agriculture Status to Fisheries — 4,83,000 fishermen to benefit ✦ Kisan Credit Card limit raised to ₹5 Lakh (Budget 2025) ✦ PMMSY Insurance: Accidental Death — ₹5 Lakh free coverage',
        schemes_heading: 'Government Schemes', schemes_sub: 'Earn benefits — schemes made for you', more_info: 'More Info',
        pmmsy_title: 'PM Matsya Sampada Yojana', pmmsy_sub: 'PMMSY — Central Government', pmmsy_tag: '₹20,050 Crore Scheme',
        pmmsy_b1: 'Subsidy on boats and fishing equipment', pmmsy_b2: 'Free Accident Insurance — ₹5 Lakh on death',
        pmmsy_b3: 'Cold Storage facility support', pmmsy_b4: 'New deep sea fishing vessels',
        pmmsy_amount: '₹5 Lakh', pmmsy_amount_desc: 'Accidental death insurance — you pay nothing', apply_now: '🌐 Apply Now',
        kcc_title: 'Kisan Credit Card', kcc_sub: 'KCC Fisheries — For Fishermen', kcc_tag: 'Low Interest Rate',
        kcc_b1: 'Loans up to ₹5 Lakh at only 7% interest', kcc_b2: 'Only 4% interest on timely repayment',
        kcc_b3: 'No collateral required up to ₹2 Lakh', kcc_b4: 'Buy boats, nets, and fishing tools',
        kcc_amount: '4–7% Interest', kcc_amount_desc: 'Budget 2025: KCC limit raised to ₹5 Lakh', kcc_apply: '💳 Apply for KCC',
        agri_title: 'Agriculture Status — Maharashtra', agri_sub: 'April 2025 — New Decision', agri_tag: 'NEW 2025',
        agri_b1: 'Electricity subsidy same as farmers', agri_b2: 'Bank loans at agricultural interest rates',
        agri_b3: 'Flood/disaster relief same as farmers', agri_b4: 'Subsidy on fish seeds and feed',
        agri_b5: '4,83,000 fishermen to benefit', agri_apply: '📋 More Information',
        agri_alert: 'Contact your District Fisheries Office',
        ins_title: 'Free Accident Insurance', ins_sub: 'Group Accidental Insurance — GAIS', ins_tag: 'FREE',
        ins_b1: 'Death / Total Disability → ₹5,00,000', ins_b2: 'Partial Disability → ₹2,50,000',
        ins_b3: 'Hospitalization → ₹25,000', ins_b4: 'Government pays the premium — you pay nothing',
        ins_amount: '₹0 Premium', ins_amount_desc: 'Over 13 crore fishermen already enrolled', ins_apply: '🔗 Register Now',
        fidf_title: 'FIDF — Infrastructure Fund', fidf_sub: 'Fisheries Infrastructure Development Fund', fidf_tag: '3% Interest Subsidy',
        fidf_b1: 'Port development, ice factory, cold storage', fidf_b2: '3% interest subsidy — 12-year repayment',
        fidf_b3: 'Fish market modernization', fidf_apply: '🌐 Apply at NFDB',
        mkssy_title: 'PM-MKSSY Scheme', mkssy_sub: 'Matsya Kisan Samridhi Sah-Yojana', mkssy_tag: 'NEW',
        mkssy_b1: 'Fish farmer registration & digital identity', mkssy_b2: 'Easy access to institutional bank loans',
        mkssy_b3: 'Aquaculture Insurance', mkssy_b4: 'Register on NFDP Portal', mkssy_apply: '📱 NFDP Portal',
        ban_heading: 'Fishing Ban Season', ban_sub: 'Important Information for Fishermen',
        ban_title: 'Maharashtra — Fishing Ban | Maharashtra Fishing Ban',
        ban_desc: 'Fishing at sea is banned during the fish breeding season. Government assistance is provided during this period. Violating the ban results in a fine.',
        ban_date: '🚫 June 15 – July 31 (60 days)', ban_allowance: '💰 Ban Allowance: Up to ₹10,000', ban_contact: '📞 Contact: District Fisheries Office',
        safety_heading: 'Sea Safety Rules', safety_sub: 'Stay Safe at Sea — Save Lives',
        s1_title: 'Wear a Life Jacket', s1_desc: 'Always wear a life jacket when going to sea',
        s2_title: 'Carry a VHF Radio', s2_desc: 'Keep communication equipment — get help in emergencies',
        s3_title: 'Check the Weather', s3_desc: 'Check weather forecast in the Sagarmitr App',
        s4_title: 'Inform Your Family', s4_desc: 'Tell your family the time before heading to sea',
        s5_title: "Don't Go in Storms", s5_desc: '🟠 Yellow / 🔴 Red alert means stay off the sea',
        s6_title: 'No Lone Night Trips', s6_desc: 'Do not go alone or to unfamiliar areas at night',
        helpline_heading: 'Important Helpline Numbers', helpline_sub: 'Call for Help — Available 24/7',
        h1_title: 'Indian Coast Guard', h1_desc: 'Sea Emergency Assistance',
        h2_title: 'Fisheries Helpline', h2_desc: 'Government Scheme Info | Toll Free',
        h3_title: 'Emergency Services', h3_desc: 'Police / Ambulance / Fire',
        h4_title: 'Weather Center', h4_desc: 'IMD Weather | Weather Alerts',
        h5_title: 'Kisan Call Center', h5_desc: 'KCC / Fisheries Scheme Help',
        h6_title: 'Elder / Widow Helpline', h6_desc: 'Support for Elderly / Widowed Women',
        rights_heading: 'Your Rights', rights_sub: 'Know Your Rights as a Fisherman',
        r1_title: '⚡ Electricity Subsidy', r1_desc: "Maharashtra granted Agriculture Status to fisheries — you'll receive electricity at reduced farmer rates.",
        r2_title: '💧 Fair Market Price', r2_desc: 'Use the Sagarmitr Catch to Cash module to understand the right price for your fish in the market.',
        r3_title: '🌊 Disaster Relief', r3_desc: "In floods, storms, and cyclones, you'll receive compensation equivalent to farmers. Apply at the district office.",
        r4_title: '📋 Fishing License Rights', r4_desc: 'A registered fisherman has the legal right to fish. No one can stop you without a valid license.',
        r5_title: "🏫 Children's Education", r5_desc: "Fishermen's children receive scholarships and priority in government schools. Contact your District Fisheries Office.",
        footer_desc: 'Digital Platform Empowering Coastal Fishermen of Maharashtra<br>Weather Forecast · Fish Identification · Market Prices · Awareness',
      },
    };

    let currentLang = 'mr';

    function t(key: string): string {
      return translations[currentLang][key] || translations['mr'][key] || key;
    }

    function applyTranslations(lang: string) {
      document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n')!;
        const value = translations[lang][key];
        if (value !== undefined) el.innerHTML = value;
      });
      document.documentElement.lang = lang === 'en' ? 'en' : lang === 'hi' ? 'hi' : 'mr';
      document.title = lang === 'en' ? 'Sagarmitr — Fishermen Awareness Portal' : 'सागरमित्र - जागरूकता | Sagarmitr Awareness';
    }

    function setLang(lang: string) {
      if (lang === currentLang) return;
      currentLang = lang;
      document.querySelectorAll<HTMLElement>('.lang-btn').forEach(b => b.classList.remove('active'));
      const btn = document.querySelector<HTMLElement>(`.lang-btn[data-lang="${lang}"]`);
      if (btn) btn.classList.add('active');
      document.body.classList.add('lang-switching');
      setTimeout(() => {
        applyTranslations(lang);
        document.body.classList.remove('lang-switching');
      }, 200);
      try { localStorage.setItem('sagarmitr_lang', lang); } catch (_) {}
    }

    function toggleCard(card: HTMLElement) {
      const wasActive = card.classList.contains('active');
      document.querySelectorAll<HTMLElement>('.scheme-card').forEach(c => c.classList.remove('active'));
      if (!wasActive) card.classList.add('active');
    }

    // Attach lang buttons
    document.querySelectorAll<HTMLElement>('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang!));
    });

    // Attach scheme cards
    document.querySelectorAll<HTMLElement>('.scheme-card').forEach(card => {
      card.addEventListener('click', () => toggleCard(card));
    });

    // Attach agri alert button
    const agriBtn = document.getElementById('agri-alert-btn');
    if (agriBtn) {
      agriBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        alert(t('agri_alert'));
      });
    }

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 6) * 60}ms`;
      observer.observe(el);
    });

    // Init language
    let saved = 'mr';
    try { saved = localStorage.getItem('sagarmitr_lang') || 'mr'; } catch (_) {}
    if (saved !== 'mr') setLang(saved);
    else applyTranslations('mr');

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi:ital@0;1&family=Baloo+2:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root {
          --deep:#03111f; --ocean:#042f4b; --wave:#0a5c84; --teal:#0e8a9e;
          --foam:#7ecbcf; --gold:#f4a435; --amber:#e8831a; --red:#e84545;
          --green:#2ecc71; --white:#f0f8ff; --text:#e8f4f8; --muted:#8bb8c8;
        }
        .awareness-root { font-family:'Baloo 2','Noto Sans Devanagari',sans-serif; background:var(--deep); color:var(--text); overflow-x:hidden; min-height:100vh; position:relative; }
        .awareness-root::before { content:''; position:fixed; inset:0; background:radial-gradient(ellipse at 20% 80%,rgba(14,138,158,.15) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(10,92,132,.2) 0%,transparent 50%),radial-gradient(ellipse at 50% 50%,rgba(4,47,75,.3) 0%,transparent 70%); pointer-events:none; z-index:0; }
        .wave-bg { position:fixed; bottom:0; left:0; width:100%; height:200px; opacity:.07; pointer-events:none; z-index:0; }
        .aw-header { position:relative; z-index:10; background:linear-gradient(135deg,var(--ocean) 0%,rgba(10,92,132,.8) 100%); border-bottom:3px solid var(--teal); overflow:hidden; }
        .header-ocean-strip { height:6px; background:linear-gradient(90deg,var(--gold),var(--amber),var(--teal),var(--foam),var(--gold)); background-size:300% 100%; animation:shimmer 4s ease infinite; }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .header-inner { max-width:900px; margin:0 auto; padding:24px 20px 20px; display:flex; align-items:center; gap:20px; }
        .logo-boat { font-size:56px; line-height:1; animation:float 3s ease-in-out infinite; filter:drop-shadow(0 4px 12px rgba(244,164,53,.4)); }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
        .header-text h1 { font-size:2rem; font-weight:800; color:var(--gold); letter-spacing:-.5px; line-height:1.1; text-shadow:0 2px 12px rgba(244,164,53,.3); }
        .header-text h1 span { color:var(--foam); font-weight:400; font-size:1.1rem; display:block; margin-top:2px; }
        .header-text p { font-size:.85rem; color:var(--muted); margin-top:4px; }
        .back-btn { background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.15); border-radius:10px; padding:7px 14px; color:var(--foam); font-size:.8rem; font-weight:600; cursor:pointer; font-family:inherit; white-space:nowrap; transition:background .2s; }
        .back-btn:hover { background:rgba(255,255,255,.15); }
        .emergency-banner { position:relative; z-index:10; background:linear-gradient(135deg,#7b0000,#c0392b); padding:14px 20px; display:flex; align-items:center; justify-content:center; gap:12px; cursor:pointer; border-bottom:2px solid rgba(255,255,255,.2); flex-wrap:wrap; }
        .emergency-banner:hover { background:linear-gradient(135deg,#9b0000,#e74c3c); }
        .pulse-ring { width:18px; height:18px; border-radius:50%; background:#ff6b6b; position:relative; flex-shrink:0; }
        .pulse-ring::after { content:''; position:absolute; inset:-4px; border-radius:50%; border:2px solid #ff6b6b; animation:pulse 1.5s ease-out infinite; }
        @keyframes pulse { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.5);opacity:0} }
        .emergency-banner strong { font-size:1rem; color:#fff; font-weight:700; }
        .emergency-banner .phone { background:rgba(255,255,255,.2); padding:4px 14px; border-radius:20px; font-size:1.1rem; font-weight:800; color:#fff; border:1px solid rgba(255,255,255,.4); letter-spacing:1px; }
        .lang-bar { position:relative; z-index:10; background:rgba(4,47,75,.6); padding:8px 20px; display:flex; justify-content:center; gap:8px; }
        .lang-btn { padding:5px 16px; border-radius:20px; border:1.5px solid var(--teal); background:transparent; color:var(--foam); font-family:'Baloo 2',sans-serif; font-size:.85rem; cursor:pointer; transition:all .2s; }
        .lang-btn.active,.lang-btn:hover { background:var(--teal); color:#fff; font-weight:700; }
        main { position:relative; z-index:5; max-width:900px; margin:0 auto; padding:24px 16px 60px; }
        .section-heading { display:flex; align-items:center; gap:12px; margin:36px 0 18px; }
        .section-heading .icon { font-size:2rem; background:var(--ocean); border-radius:14px; width:56px; height:56px; display:flex; align-items:center; justify-content:center; border:2px solid var(--wave); flex-shrink:0; }
        .section-heading h2 { font-size:1.4rem; font-weight:800; color:var(--gold); line-height:1.2; }
        .section-heading h2 span { display:block; font-size:.9rem; color:var(--muted); font-weight:400; margin-top:2px; }
        .scheme-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
        .scheme-card { background:linear-gradient(135deg,var(--ocean) 0%,rgba(10,92,132,.3) 100%); border:1.5px solid rgba(14,138,158,.3); border-radius:20px; padding:20px; cursor:pointer; transition:all .3s ease; position:relative; overflow:hidden; }
        .scheme-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--card-accent,var(--teal)); border-radius:20px 20px 0 0; }
        .scheme-card:hover { transform:translateY(-4px); border-color:rgba(14,138,158,.7); box-shadow:0 12px 36px rgba(0,0,0,.4),0 0 0 1px rgba(14,138,158,.2); }
        .scheme-card.active { border-color:var(--card-accent,var(--teal)); box-shadow:0 0 0 2px var(--card-accent,var(--teal)),0 12px 36px rgba(0,0,0,.4); }
        .card-top { display:flex; align-items:flex-start; gap:14px; margin-bottom:14px; }
        .card-emoji { font-size:2.2rem; line-height:1; flex-shrink:0; background:rgba(255,255,255,.05); border-radius:12px; padding:8px; width:56px; height:56px; display:flex; align-items:center; justify-content:center; }
        .card-title { flex:1; }
        .card-title h3 { font-size:1rem; font-weight:800; color:var(--white); line-height:1.3; }
        .card-title .subtitle { font-size:.75rem; color:var(--muted); margin-top:3px; }
        .benefit-tag { display:inline-block; background:rgba(46,204,113,.15); border:1px solid rgba(46,204,113,.4); color:var(--green); font-size:.72rem; font-weight:700; padding:3px 10px; border-radius:12px; margin-bottom:12px; text-transform:uppercase; letter-spacing:.5px; }
        .benefit-tag.gold { background:rgba(244,164,53,.15); border-color:rgba(244,164,53,.4); color:var(--gold); }
        .benefit-tag.red { background:rgba(232,69,69,.15); border-color:rgba(232,69,69,.4); color:#ff8080; }
        .card-body { font-size:.85rem; color:var(--text); line-height:1.6; display:none; margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,.08); }
        .scheme-card.active .card-body { display:block; animation:fadeIn .3s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .card-body ul { list-style:none; padding:0; }
        .card-body ul li { display:flex; gap:8px; align-items:flex-start; margin-bottom:8px; font-size:.85rem; }
        .card-body ul li .bullet { color:var(--gold); flex-shrink:0; margin-top:1px; }
        .card-amount { background:rgba(244,164,53,.1); border:1px solid rgba(244,164,53,.3); border-radius:10px; padding:10px 14px; margin-top:14px; display:flex; align-items:center; gap:10px; }
        .card-amount .rupee { font-size:1.4rem; color:var(--gold); }
        .card-amount div strong { display:block; color:var(--gold); font-size:1.1rem; font-weight:800; }
        .card-amount div span { font-size:.75rem; color:var(--muted); }
        .apply-btn { display:flex; align-items:center; justify-content:center; gap:8px; margin-top:14px; padding:10px 16px; background:linear-gradient(135deg,var(--teal),var(--wave)); border:none; border-radius:12px; color:#fff; font-family:'Baloo 2',sans-serif; font-size:.85rem; font-weight:700; cursor:pointer; width:100%; transition:all .2s; text-decoration:none; }
        .apply-btn:hover { background:linear-gradient(135deg,var(--foam),var(--teal)); transform:translateY(-1px); }
        .expand-hint { font-size:.72rem; color:var(--muted); display:flex; align-items:center; gap:4px; margin-top:8px; }
        .chevron { transition:transform .3s; display:inline-block; }
        .scheme-card.active .chevron { transform:rotate(180deg); }
        .safety-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
        .safety-card { background:var(--ocean); border-radius:16px; padding:18px 16px; text-align:center; border:1.5px solid rgba(14,138,158,.2); transition:transform .2s; }
        .safety-card:hover { transform:translateY(-3px); }
        .safety-card .safety-icon { font-size:2.4rem; margin-bottom:10px; display:block; }
        .safety-card h4 { font-size:.9rem; font-weight:700; color:var(--white); line-height:1.3; margin-bottom:6px; }
        .safety-card p { font-size:.75rem; color:var(--muted); line-height:1.4; }
        .safety-card.do { border-color:rgba(46,204,113,.4); }
        .safety-card.dont { border-color:rgba(232,69,69,.4); }
        .safety-card.do h4::before { content:'✅ '; }
        .safety-card.dont h4::before { content:'❌ '; }
        .ban-banner { background:linear-gradient(135deg,rgba(232,131,26,.2),rgba(244,164,53,.1)); border:2px solid rgba(232,131,26,.5); border-radius:20px; padding:20px 24px; display:flex; gap:16px; align-items:flex-start; }
        .ban-banner .ban-icon { font-size:3rem; flex-shrink:0; animation:float 3s ease-in-out infinite; }
        .ban-banner h3 { font-size:1.1rem; font-weight:800; color:var(--amber); margin-bottom:8px; }
        .ban-banner p { font-size:.87rem; color:var(--text); line-height:1.6; }
        .ban-dates { display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
        .ban-date-tag { background:rgba(232,131,26,.2); border:1px solid rgba(232,131,26,.5); border-radius:10px; padding:6px 14px; font-size:.82rem; font-weight:700; color:var(--amber); display:flex; align-items:center; gap:6px; }
        .helpline-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:14px; }
        .helpline-card { background:var(--ocean); border-radius:18px; padding:18px 20px; display:flex; align-items:center; gap:16px; border:1.5px solid rgba(14,138,158,.25); transition:all .2s; cursor:pointer; text-decoration:none; }
        .helpline-card:hover { transform:translateY(-3px); border-color:var(--teal); }
        .helpline-card .hc-icon { font-size:2rem; background:rgba(255,255,255,.05); border-radius:14px; width:52px; height:52px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .helpline-card h4 { font-size:.9rem; font-weight:700; color:var(--white); margin-bottom:4px; }
        .helpline-card .number { font-size:1.3rem; font-weight:800; color:var(--gold); letter-spacing:1px; }
        .helpline-card .desc { font-size:.72rem; color:var(--muted); }
        .rights-list { display:flex; flex-direction:column; gap:12px; }
        .right-item { background:var(--ocean); border-radius:16px; padding:16px 20px; display:flex; gap:16px; align-items:flex-start; border:1px solid rgba(255,255,255,.06); transition:border-color .2s; }
        .right-item:hover { border-color:rgba(14,138,158,.4); }
        .right-item .ri-num { background:var(--teal); color:#fff; font-size:.85rem; font-weight:800; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }
        .right-item h4 { font-size:.95rem; font-weight:700; color:var(--white); margin-bottom:4px; }
        .right-item p { font-size:.82rem; color:var(--muted); line-height:1.5; }
        .aw-footer { position:relative; z-index:5; background:var(--ocean); border-top:2px solid rgba(14,138,158,.3); padding:24px 20px; text-align:center; }
        .aw-footer .footer-logo { font-size:1.2rem; font-weight:800; color:var(--gold); margin-bottom:6px; }
        .aw-footer p { font-size:.78rem; color:var(--muted); line-height:1.6; }
        .reveal { opacity:0; transform:translateY(20px); transition:all .5s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .news-ticker { background:rgba(10,92,132,.4); border:1px solid rgba(14,138,158,.3); border-radius:12px; padding:10px 16px; display:flex; align-items:center; gap:12px; overflow:hidden; margin-bottom:8px; }
        .ticker-label { background:var(--teal); color:#fff; font-size:.72rem; font-weight:800; padding:3px 10px; border-radius:8px; white-space:nowrap; text-transform:uppercase; letter-spacing:.5px; flex-shrink:0; }
        .ticker-text { font-size:.85rem; color:var(--foam); white-space:nowrap; animation:ticker 20s linear infinite; }
        @keyframes ticker { 0%{transform:translateX(100%)} 100%{transform:translateX(-100%)} }
        [data-i18n] { transition:opacity .2s ease; }
        .lang-switching [data-i18n] { opacity:0; }
        @media(max-width:600px){
          .header-text h1{font-size:1.4rem;}
          .scheme-grid{grid-template-columns:1fr;}
          .safety-grid{grid-template-columns:repeat(2,1fr);}
          .helpline-grid{grid-template-columns:1fr;}
          .ban-banner{flex-direction:column;gap:10px;}
        }
      `}</style>

      <div className="awareness-root">

        <svg className="wave-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 C150,180 350,0 600,100 C850,200 1050,20 1200,100 L1200,200 L0,200 Z" fill="var(--foam)" />
        </svg>

        {/* HEADER */}
        <header className="aw-header">
          <div className="header-ocean-strip" />
          <div className="header-inner">
            <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
            <div className="logo-boat">⛵</div>
            <div className="header-text">
              <h1>SagarMitr<span data-i18n="header_tagline">Sagarmitr — मच्छीमारांचा मित्र</span></h1>
              <p data-i18n="header_sub">जागरूकता • सरकारी योजना • हक्क • सुरक्षा | Awareness · Schemes · Rights · Safety</p>
            </div>
          </div>
        </header>

        {/* EMERGENCY BANNER */}
        <div className="emergency-banner" onClick={() => window.location.href = 'tel:18001801717'}>
          <div className="pulse-ring" />
          <strong data-i18n="emergency_text">🚨 आपत्कालीन सागर हेल्पलाइन | Sea Emergency:</strong>
          <span className="phone">📞 1800-180-1717</span>
          <strong style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }} data-i18n="toll_free">टोल फ्री</strong>
        </div>

        {/* LANG BAR */}
        <div className="lang-bar">
            <button className="lang-btn active" data-lang="en">English</button>
          <button className="lang-btn" data-lang="mr">मराठी</button>
          <button className="lang-btn" data-lang="hi">हिंदी</button>

        </div>

        {/* MAIN */}
        <main>

          {/* NEWS TICKER */}
          <div className="news-ticker reveal">
            <span className="ticker-label" data-i18n="ticker_label">📢 नवीन | NEW</span>
            <span className="ticker-text" data-i18n="ticker_text">✦ महाराष्ट्र सरकारने मत्स्यपालनाला कृषी दर्जा दिला — 4,83,000 मच्छीमारांना फायदा ✦ किसान क्रेडिट कार्ड मर्यादा ₹5 लाख पर्यंत वाढवली (Budget 2025) ✦ PMMSY अंतर्गत विमा: अपघाती मृत्यू — ₹5 लाख मोफत संरक्षण</span>
          </div>

          {/* SCHEMES HEADING */}
          <div className="section-heading reveal">
            <div className="icon">🏛️</div>
            <h2 data-i18n="schemes_heading">सरकारी योजना <span data-i18n="schemes_sub">Government Schemes — तुमच्यासाठी पैसे मिळवा</span></h2>
          </div>

          {/* SCHEME GRID */}
          <div className="scheme-grid">

            {/* PMMSY */}
            <div className="scheme-card reveal" style={{ '--card-accent': '#0e8a9e' } as React.CSSProperties}>
              <div className="card-top">
                <div className="card-emoji">🐟</div>
                <div className="card-title">
                  <h3 data-i18n="pmmsy_title">PM मत्स्य संपदा योजना</h3>
                  <div className="subtitle" data-i18n="pmmsy_sub">PMMSY — केंद्र सरकार</div>
                </div>
              </div>
              <span className="benefit-tag" data-i18n="pmmsy_tag">₹20,050 कोटी योजना</span>
              <div className="expand-hint">👆 <span data-i18n="more_info">अधिक माहिती</span> <span className="chevron">▼</span></div>
              <div className="card-body">
                <ul>
                  <li><span className="bullet">►</span><span data-i18n="pmmsy_b1">होडी व मासेमारी साधनांवर अनुदान (Subsidy)</span></li>
                  <li><span className="bullet">►</span><span data-i18n="pmmsy_b2">मोफत अपघात विमा — मृत्यूस ₹5 लाख</span></li>
                  <li><span className="bullet">►</span><span data-i18n="pmmsy_b3">थंड साठवण (Cold Storage) सुविधा</span></li>
                  <li><span className="bullet">►</span><span data-i18n="pmmsy_b4">नवीन खोल समुद्र मासेमारी जहाज</span></li>
                </ul>
                <div className="card-amount">
                  <span className="rupee">💰</span>
                  <div><strong data-i18n="pmmsy_amount">₹5 लाख</strong><span data-i18n="pmmsy_amount_desc">अपघाती मृत्यूवर विमा — तुम्हाला काहीही भरायचे नाही</span></div>
                </div>
                <a href="https://pmmsy.dof.gov.in" target="_blank" rel="noopener noreferrer" className="apply-btn" data-i18n="apply_now">🌐 अर्ज करा / Apply Now</a>
              </div>
            </div>

            {/* KCC */}
            <div className="scheme-card reveal" style={{ '--card-accent': '#f4a435' } as React.CSSProperties}>
              <div className="card-top">
                <div className="card-emoji">💳</div>
                <div className="card-title">
                  <h3 data-i18n="kcc_title">किसान क्रेडिट कार्ड</h3>
                  <div className="subtitle" data-i18n="kcc_sub">KCC Fisheries — मच्छीमारांसाठी</div>
                </div>
              </div>
              <span className="benefit-tag gold" data-i18n="kcc_tag">कमी व्याजदर</span>
              <div className="expand-hint">👆 <span data-i18n="more_info">अधिक माहिती</span> <span className="chevron">▼</span></div>
              <div className="card-body">
                <ul>
                  <li><span className="bullet">►</span><span data-i18n="kcc_b1">₹5 लाख पर्यंत कर्ज फक्त 7% व्याजाने</span></li>
                  <li><span className="bullet">►</span><span data-i18n="kcc_b2">वेळेत परतफेड केल्यास फक्त 4% व्याज</span></li>
                  <li><span className="bullet">►</span><span data-i18n="kcc_b3">वेळेपूर्वी जमानत नाही — ₹2 लाख पर्यंत</span></li>
                  <li><span className="bullet">►</span><span data-i18n="kcc_b4">होडी, जाळे, साधने खरेदी करा</span></li>
                </ul>
                <div className="card-amount">
                  <span className="rupee">🏦</span>
                  <div><strong data-i18n="kcc_amount">4–7% व्याज</strong><span data-i18n="kcc_amount_desc">Budget 2025: KCC मर्यादा ₹5 लाख केली</span></div>
                </div>
                <a href="https://dof.gov.in/fisherieskcc" target="_blank" rel="noopener noreferrer" className="apply-btn" data-i18n="kcc_apply">💳 KCC अर्ज करा</a>
              </div>
            </div>

            {/* AGRI STATUS */}
            <div className="scheme-card reveal" style={{ '--card-accent': '#2ecc71' } as React.CSSProperties}>
              <div className="card-top">
                <div className="card-emoji">⚓</div>
                <div className="card-title">
                  <h3 data-i18n="agri_title">कृषी दर्जा — महाराष्ट्र</h3>
                  <div className="subtitle" data-i18n="agri_sub">April 2025 — नवीन निर्णय</div>
                </div>
              </div>
              <span className="benefit-tag" data-i18n="agri_tag">नवीन 2025</span>
              <div className="expand-hint">👆 <span data-i18n="more_info">अधिक माहिती</span> <span className="chevron">▼</span></div>
              <div className="card-body">
                <ul>
                  <li><span className="bullet">►</span><span data-i18n="agri_b1">शेतकऱ्यांसारखेच विद्युत सवलत मिळेल</span></li>
                  <li><span className="bullet">►</span><span data-i18n="agri_b2">शेती दराने बँक कर्ज मिळेल</span></li>
                  <li><span className="bullet">►</span><span data-i18n="agri_b3">पूर/नैसर्गिक आपत्तीत शेतकऱ्यांसारखी मदत</span></li>
                  <li><span className="bullet">►</span><span data-i18n="agri_b4">माशांच्या बियाणे व खाद्यावर अनुदान</span></li>
                  <li><span className="bullet">►</span><span data-i18n="agri_b5">4,83,000 मच्छीमारांना लाभ</span></li>
                </ul>
                <button id="agri-alert-btn" className="apply-btn" data-i18n="agri_apply">📋 अधिक माहिती</button>
              </div>
            </div>

            {/* INSURANCE */}
            <div className="scheme-card reveal" style={{ '--card-accent': '#e84545' } as React.CSSProperties}>
              <div className="card-top">
                <div className="card-emoji">🛡️</div>
                <div className="card-title">
                  <h3 data-i18n="ins_title">मोफत अपघात विमा</h3>
                  <div className="subtitle" data-i18n="ins_sub">Group Accidental Insurance — GAIS</div>
                </div>
              </div>
              <span className="benefit-tag red" data-i18n="ins_tag">मोफत | FREE</span>
              <div className="expand-hint">👆 <span data-i18n="more_info">अधिक माहिती</span> <span className="chevron">▼</span></div>
              <div className="card-body">
                <ul>
                  <li><span className="bullet">►</span><span data-i18n="ins_b1">मृत्यू / पूर्ण अपंगत्व → ₹5,00,000</span></li>
                  <li><span className="bullet">►</span><span data-i18n="ins_b2">आंशिक अपंगत्व → ₹2,50,000</span></li>
                  <li><span className="bullet">►</span><span data-i18n="ins_b3">रुग्णालय खर्च → ₹25,000</span></li>
                  <li><span className="bullet">►</span><span data-i18n="ins_b4">प्रीमियम सरकार भरते — तुम्हाला एक पैसाही नाही</span></li>
                </ul>
                <div className="card-amount">
                  <span className="rupee">🛡️</span>
                  <div><strong data-i18n="ins_amount">₹0 प्रीमियम</strong><span data-i18n="ins_amount_desc">13 कोटी मच्छीमारांना आधीच मिळाला लाभ</span></div>
                </div>
                <a href="https://pmmsy.dof.gov.in" target="_blank" rel="noopener noreferrer" className="apply-btn" data-i18n="ins_apply">🔗 नोंदणी करा</a>
              </div>
            </div>

            {/* FIDF */}
            <div className="scheme-card reveal" style={{ '--card-accent': '#7ecbcf' } as React.CSSProperties}>
              <div className="card-top">
                <div className="card-emoji">🏗️</div>
                <div className="card-title">
                  <h3 data-i18n="fidf_title">FIDF — पायाभूत निधी</h3>
                  <div className="subtitle" data-i18n="fidf_sub">Fisheries Infrastructure Development Fund</div>
                </div>
              </div>
              <span className="benefit-tag" data-i18n="fidf_tag">3% व्याज सवलत</span>
              <div className="expand-hint">👆 <span data-i18n="more_info">अधिक माहिती</span> <span className="chevron">▼</span></div>
              <div className="card-body">
                <ul>
                  <li><span className="bullet">►</span><span data-i18n="fidf_b1">बंदर विकास, बर्फ कारखाना, शीतगृह</span></li>
                  <li><span className="bullet">►</span><span data-i18n="fidf_b2">3% व्याज सवलत — 12 वर्षे परतफेड</span></li>
                  <li><span className="bullet">►</span><span data-i18n="fidf_b3">मत्स्य बाजार आधुनिकीकरण</span></li>
                </ul>
                <a href="https://nfdb.gov.in" target="_blank" rel="noopener noreferrer" className="apply-btn" data-i18n="fidf_apply">🌐 NFDB कडे अर्ज</a>
              </div>
            </div>

            {/* MKSSY */}
            <div className="scheme-card reveal" style={{ '--card-accent': '#e8831a' } as React.CSSProperties}>
              <div className="card-top">
                <div className="card-emoji">🌊</div>
                <div className="card-title">
                  <h3 data-i18n="mkssy_title">PM-MKSSY योजना</h3>
                  <div className="subtitle" data-i18n="mkssy_sub">Matsya Kisan Samridhi Sah-Yojana</div>
                </div>
              </div>
              <span className="benefit-tag gold" data-i18n="mkssy_tag">नवीन</span>
              <div className="expand-hint">👆 <span data-i18n="more_info">अधिक माहिती</span> <span className="chevron">▼</span></div>
              <div className="card-body">
                <ul>
                  <li><span className="bullet">►</span><span data-i18n="mkssy_b1">मत्स्य शेतकरी नोंदणी व डिजिटल ओळख</span></li>
                  <li><span className="bullet">►</span><span data-i18n="mkssy_b2">बँक संस्थात्मक कर्ज सुलभतेने मिळवा</span></li>
                  <li><span className="bullet">►</span><span data-i18n="mkssy_b3">जलचर विमा (Aquaculture Insurance)</span></li>
                  <li><span className="bullet">►</span><span data-i18n="mkssy_b4">NFDP Portal वर नोंदणी करा</span></li>
                </ul>
                <a href="https://nfdp.dof.gov.in" target="_blank" rel="noopener noreferrer" className="apply-btn" data-i18n="mkssy_apply">📱 NFDP Portal</a>
              </div>
            </div>

          </div>{/* /scheme-grid */}

          {/* BAN SEASON */}
          <div className="section-heading reveal">
            <div className="icon">📅</div>
            <h2 data-i18n="ban_heading">मासेमारी बंदी हंगाम <span data-i18n="ban_sub">Fishing Ban Season — महत्त्वाची माहिती</span></h2>
          </div>
          <div className="ban-banner reveal">
            <div className="ban-icon">⚠️</div>
            <div>
              <h3 data-i18n="ban_title">महाराष्ट्र — मासेमारी बंदी | Maharashtra Fishing Ban</h3>
              <p data-i18n="ban_desc">माशांच्या प्रजनन काळात समुद्रात जाण्यास बंदी असते. या काळात सरकारकडून मदत मिळते. कायदा मोडल्यास दंड होतो.</p>
              <div className="ban-dates">
                <div className="ban-date-tag" data-i18n="ban_date">🚫 15 जून – 31 जुलै (60 दिवस)</div>
                <div className="ban-date-tag" data-i18n="ban_allowance">💰 बंदी भत्ता: ₹10,000 पर्यंत</div>
                <div className="ban-date-tag" data-i18n="ban_contact">📞 संपर्क: जिल्हा मत्स्य कार्यालय</div>
              </div>
            </div>
          </div>

          {/* SAFETY */}
          <div className="section-heading reveal">
            <div className="icon">⚓</div>
            <h2 data-i18n="safety_heading">सागरी सुरक्षा नियम <span data-i18n="safety_sub">Sea Safety Rules — जीव वाचवा</span></h2>
          </div>
          <div className="safety-grid">
            <div className="safety-card do reveal"><span className="safety-icon">🦺</span><h4 data-i18n="s1_title">Life Jacket घाला</h4><p data-i18n="s1_desc">समुद्रात जाताना नेहमी जीव रक्षक जाकीट घाला</p></div>
            <div className="safety-card do reveal"><span className="safety-icon">📻</span><h4 data-i18n="s2_title">VHF Radio ठेवा</h4><p data-i18n="s2_desc">संपर्क यंत्रणा सोबत ठेवा — संकटात मदत मिळेल</p></div>
            <div className="safety-card do reveal"><span className="safety-icon">🌦️</span><h4 data-i18n="s3_title">हवामान तपासा</h4><p data-i18n="s3_desc">सागरमित्र App मध्ये हवामान अंदाज तपासा</p></div>
            <div className="safety-card do reveal"><span className="safety-icon">👥</span><h4 data-i18n="s4_title">कुटुंबाला सांगा</h4><p data-i18n="s4_desc">समुद्रात जाण्याआधी कुटुंबाला वेळ सांगा</p></div>
            <div className="safety-card dont reveal"><span className="safety-icon">🌪️</span><h4 data-i18n="s5_title">वादळात जाऊ नका</h4><p data-i18n="s5_desc">🟠 पिवळा / 🔴 लाल इशारा असल्यास समुद्रात जाऊ नका</p></div>
            <div className="safety-card dont reveal"><span className="safety-icon">🌙</span><h4 data-i18n="s6_title">रात्री एकट्याने नाही</h4><p data-i18n="s6_desc">एकट्याने व रात्री अनोळखी भागात जाऊ नका</p></div>
          </div>

          {/* HELPLINES */}
          <div className="section-heading reveal">
            <div className="icon">📞</div>
            <h2 data-i18n="helpline_heading">महत्त्वाचे हेल्पलाइन नंबर <span data-i18n="helpline_sub">Important Helplines — मदतीसाठी कॉल करा</span></h2>
          </div>
          <div className="helpline-grid">
            <a className="helpline-card reveal" href="tel:1554"><div className="hc-icon">🚢</div><div><h4 data-i18n="h1_title">Indian Coast Guard</h4><div className="number">📞 1554</div><div className="desc" data-i18n="h1_desc">सागरी आपत्कालीन मदत | Sea Emergency</div></div></a>
            <a className="helpline-card reveal" href="tel:18001801717"><div className="hc-icon">🐠</div><div><h4 data-i18n="h2_title">मत्स्यव्यवसाय हेल्पलाइन</h4><div className="number">📞 1800-180-1717</div><div className="desc" data-i18n="h2_desc">सरकारी योजना माहिती | टोल फ्री</div></div></a>
            <a className="helpline-card reveal" href="tel:112"><div className="hc-icon">🚨</div><div><h4 data-i18n="h3_title">आपत्कालीन सेवा</h4><div className="number">📞 112</div><div className="desc" data-i18n="h3_desc">Police / Ambulance / Fire</div></div></a>
            <a className="helpline-card reveal" href="tel:1800233444"><div className="hc-icon">🌦️</div><div><h4 data-i18n="h4_title">हवामान केंद्र</h4><div className="number">📞 1800-233-444</div><div className="desc" data-i18n="h4_desc">IMD Weather | हवामान इशारा</div></div></a>
            <a className="helpline-card reveal" href="tel:18001802117"><div className="hc-icon">🏥</div><div><h4 data-i18n="h5_title">किसान कॉल सेंटर</h4><div className="number">📞 1800-180-2117</div><div className="desc" data-i18n="h5_desc">KCC / मत्स्य योजना मदत</div></div></a>
            <a className="helpline-card reveal" href="tel:14567"><div className="hc-icon">👴</div><div><h4 data-i18n="h6_title">Elder / Widow Helpline</h4><div className="number">📞 14567</div><div className="desc" data-i18n="h6_desc">वृद्ध / विधवा महिला मदत</div></div></a>
          </div>

          {/* RIGHTS */}
          <div className="section-heading reveal">
            <div className="icon">⚖️</div>
            <h2 data-i18n="rights_heading">तुमचे हक्क <span data-i18n="rights_sub">Your Rights — जाणून घ्या</span></h2>
          </div>
          <div className="rights-list">
            <div className="right-item reveal"><div className="ri-num">1</div><div><h4 data-i18n="r1_title">⚡ वीज सवलत | Electricity Subsidy</h4><p data-i18n="r1_desc">महाराष्ट्र सरकारने मत्स्यपालनाला कृषी दर्जा दिला — तुम्हाला शेतकऱ्यांसारखे कमी दराने वीज मिळेल.</p></div></div>
            <div className="right-item reveal"><div className="ri-num">2</div><div><h4 data-i18n="r2_title">💧 किमान आधारभूत किंमत | Fair Market Price</h4><p data-i18n="r2_desc">तुमच्या माशाची योग्य किंमत मिळवण्यासाठी सागरमित्र Catch to Cash मॉड्यूल वापरा — बाजारातील योग्य दर समजेल.</p></div></div>
            <div className="right-item reveal"><div className="ri-num">3</div><div><h4 data-i18n="r3_title">🌊 नैसर्गिक आपत्तीत मदत | Disaster Relief</h4><p data-i18n="r3_desc">पूर, वादळ, चक्रीवादळात शेतकऱ्यांसारखीच नुकसानभरपाई मिळेल. जिल्हा कार्यालयात अर्ज करा.</p></div></div>
            <div className="right-item reveal"><div className="ri-num">4</div><div><h4 data-i18n="r4_title">📋 मत्स्य परवाना | Fishing License Rights</h4><p data-i18n="r4_desc">नोंदणीकृत मच्छीमाराला मासेमारी करण्याचा कायदेशीर हक्क आहे. परवान्याशिवाय कोणी अडवू शकत नाही.</p></div></div>
            <div className="right-item reveal"><div className="ri-num">5</div><div><h4 data-i18n="r5_title">🏫 मुलांचे शिक्षण | Children's Education</h4><p data-i18n="r5_desc">मच्छीमारांच्या मुलांना शिष्यवृत्ती व शासकीय शाळांत प्राधान्य मिळते. जिल्हा मत्स्य कार्यालयाशी संपर्क करा.</p></div></div>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="aw-footer">
          <div className="footer-logo">⛵ सागरमित्र | Sagarmitr</div>
          <p data-i18n="footer_desc">मच्छीमारांना सशक्त करणारे डिजिटल व्यासपीठ | Empowering Coastal Fishermen of Maharashtra<br />हवामान अंदाज • मासे ओळख • बाजार भाव • जागरूकता</p>
          <p style={{ marginTop: 10, fontSize: '0.7rem', opacity: 0.5 }}>© 2025 Sagarmitr — Made with ❤️ for the fishermen of Mumbai &amp; Maharashtra</p>
        </footer>

      </div>
    </>
  );
};

export default AwarenessPage;