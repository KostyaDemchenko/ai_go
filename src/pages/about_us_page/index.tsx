"use client";

import React from "react";
import Image from "next/image";

import Head from "next/head";
import Header from "@/components/BasicСomponents/Header";
import ScrollToTop from "@/components/BasicСomponents/ScrollToTop";
import Footer from "@/components/BasicСomponents/Footer";

import about_us from "@/public/img/about-us.png";

import "./style.scss";
import "@/src/app/globals.scss";

export default function ai_list() {
  return (
    <>
      {/* Metadata */}
      <Head>
        <title>AiGo - Нейромережі</title>
        <meta property="og:title" content="AiGo - Нейромережі" />
        <meta
          property="og:image"
          content="https://lh3.googleusercontent.com/fife/ALs6j_FkoimID5Wv2OCQzOiiz-JAtJJjO8CK9ka7H1Bz2SonuBS_fxfr_g5f_BSi3FRe2KZYmZU6EydV0fAkdpsq6nAqaX_8BxvyrKCROHG5lykirKnVRWiQV41kmatVde4xthl-19xgHyIAgj72pnUyTiC8thZgCdrcrOsJMY99EK2TLP-mW_4N4K5tbnTDBPBgqq24GTTafaRH15pcGAZ9bNDAHeRi5WQZHqjCg7aUsWnBym9I21YbzjC9OH-lhT7mdLaOdGpnouaCMRCELRQuRhn1RAekYW4Wg-nTLV3Ed1FzZYwoDg8j03hA3xXrgt-rRPGYLW5s8gso4s8E0QY80Jetv5kh25J0gaZGnTdjI8vsGrG5EMbQpnsIFZENsLoHh8a07j6z7Mkdnv19ZzTYw9IrkMan0QuFZH0w81oLeWG8OeusTVCmqtn77qW_0aqz7IS0ON-9STNa4GZXIlp3YruKON1EHCOccNxt4mlL7g7Q_0DrQvdJNIAyFxprav9SfekSSm-Mn_vPkgV6V7Djm3CScTbME1IXitq4zuEyFQr78T_rWyK_NjV-j9Ewfg43Qd4wVGC_-zjB-oItIlEvWVfUdemZAK1ZqgyjbTSJwZ0X4xfLvJs3JFCVAVDZZOiRFredZt5fKrNbYzboIuTmiLPziYUaOF7JLjvN8eBRWUxnN7xu3nnB3oKeW4grYw70CXKDMgpHgQodcgokmob-6LYlonSWbIPXpeN_XDmf2W9mja_bEukfazpM6gcauJlBGGU8n6Ri4PC4LD5nsc4biRJ6l7DsgbNiHrJcWYw3xipzBeifzfCTZCeN5Vl8RGXkpdaFAgwacUWIzPS2nHBH40gMjE6vXVzFaYY8MQqiSx8HnrR1D9iJAdmUvlDiKXd0zvdAGYe6YKqyLGFrNtRr6XdUyBe6H6sDRry3omw-iH9bQZjOYHgTK3Y0TiiOQXHy2HTxFDTyAMmDjEiXJRwRdRJ2M_usd1Ywx_F_YloZzGnjLFz3NAMQdix9eDycURnz0tNXIQZszdBH7USf0S6_0rJEydDjRVcKlOJIVDeoYgP61v3Dx1fLzvvgw0eZ6iBd1O0Haraoc5zWCjm7-FxMN0HSeJJPABSFxY-JhsKaC5aFHPvIVHZC-69NwNpcFx5-mSl6dxAPsGnl7ZNzdlQHRpFguzFjgy3jQdgS1B4148GLy6AXRElMHVcNMF4f5o0jGGwlzY475NFPWDmTJH0wCUhAP20O2xE3CmRIUjj6AhjsH7jqt_2s__yAXeEQFMDZGPTP7sRcehL-SX3kHnwgx6GReWCZeqWv1_e_aK1W044FX2AHg1zKT4o6NgXJtotL1-pksT9K9ZRqUnyWIqRYLs1mkByK5nsEIAdZ3lL9DFfaQWERD07pfDBkoKRYfQHw8FELqg7SAUtHix5pCSUzYIKJmPpMvUFCWNU9-wsqIuga4KhznFyX-q9aQFn57XwKd8kLDtyOxhGluxzJfGO-JWBph4-fZjkOcIcLLQZjgOfAnyOEmdP2RgLjFlUVbYEuJqxG9He5tWt5bqK6u3aZT3Dqx_4wsdlMK6jktrMBM1ei3gJCW5UTgMN5_qXbTGRKpit0JAL2eS6G4jSizBFVC9Y4Mtfmcblpc0IP7tyPV61C8Mfz-uSrZ_KtTyPee3d0YbT1txcUofgVMXHyNcJi1WFw6rMa8o9LJWRwd_xM84VmsWmQJq2lzy6tMROgIlnIX8gs9YJSuUpZZlof_oMw=w3440-h1313"
        />
        <meta
          name="twitter:image"
          content="https://lh3.googleusercontent.com/fife/ALs6j_FkoimID5Wv2OCQzOiiz-JAtJJjO8CK9ka7H1Bz2SonuBS_fxfr_g5f_BSi3FRe2KZYmZU6EydV0fAkdpsq6nAqaX_8BxvyrKCROHG5lykirKnVRWiQV41kmatVde4xthl-19xgHyIAgj72pnUyTiC8thZgCdrcrOsJMY99EK2TLP-mW_4N4K5tbnTDBPBgqq24GTTafaRH15pcGAZ9bNDAHeRi5WQZHqjCg7aUsWnBym9I21YbzjC9OH-lhT7mdLaOdGpnouaCMRCELRQuRhn1RAekYW4Wg-nTLV3Ed1FzZYwoDg8j03hA3xXrgt-rRPGYLW5s8gso4s8E0QY80Jetv5kh25J0gaZGnTdjI8vsGrG5EMbQpnsIFZENsLoHh8a07j6z7Mkdnv19ZzTYw9IrkMan0QuFZH0w81oLeWG8OeusTVCmqtn77qW_0aqz7IS0ON-9STNa4GZXIlp3YruKON1EHCOccNxt4mlL7g7Q_0DrQvdJNIAyFxprav9SfekSSm-Mn_vPkgV6V7Djm3CScTbME1IXitq4zuEyFQr78T_rWyK_NjV-j9Ewfg43Qd4wVGC_-zjB-oItIlEvWVfUdemZAK1ZqgyjbTSJwZ0X4xfLvJs3JFCVAVDZZOiRFredZt5fKrNbYzboIuTmiLPziYUaOF7JLjvN8eBRWUxnN7xu3nnB3oKeW4grYw70CXKDMgpHgQodcgokmob-6LYlonSWbIPXpeN_XDmf2W9mja_bEukfazpM6gcauJlBGGU8n6Ri4PC4LD5nsc4biRJ6l7DsgbNiHrJcWYw3xipzBeifzfCTZCeN5Vl8RGXkpdaFAgwacUWIzPS2nHBH40gMjE6vXVzFaYY8MQqiSx8HnrR1D9iJAdmUvlDiKXd0zvdAGYe6YKqyLGFrNtRr6XdUyBe6H6sDRry3omw-iH9bQZjOYHgTK3Y0TiiOQXHy2HTxFDTyAMmDjEiXJRwRdRJ2M_usd1Ywx_F_YloZzGnjLFz3NAMQdix9eDycURnz0tNXIQZszdBH7USf0S6_0rJEydDjRVcKlOJIVDeoYgP61v3Dx1fLzvvgw0eZ6iBd1O0Haraoc5zWCjm7-FxMN0HSeJJPABSFxY-JhsKaC5aFHPvIVHZC-69NwNpcFx5-mSl6dxAPsGnl7ZNzdlQHRpFguzFjgy3jQdgS1B4148GLy6AXRElMHVcNMF4f5o0jGGwlzY475NFPWDmTJH0wCUhAP20O2xE3CmRIUjj6AhjsH7jqt_2s__yAXeEQFMDZGPTP7sRcehL-SX3kHnwgx6GReWCZeqWv1_e_aK1W044FX2AHg1zKT4o6NgXJtotL1-pksT9K9ZRqUnyWIqRYLs1mkByK5nsEIAdZ3lL9DFfaQWERD07pfDBkoKRYfQHw8FELqg7SAUtHix5pCSUzYIKJmPpMvUFCWNU9-wsqIuga4KhznFyX-q9aQFn57XwKd8kLDtyOxhGluxzJfGO-JWBph4-fZjkOcIcLLQZjgOfAnyOEmdP2RgLjFlUVbYEuJqxG9He5tWt5bqK6u3aZT3Dqx_4wsdlMK6jktrMBM1ei3gJCW5UTgMN5_qXbTGRKpit0JAL2eS6G4jSizBFVC9Y4Mtfmcblpc0IP7tyPV61C8Mfz-uSrZ_KtTyPee3d0YbT1txcUofgVMXHyNcJi1WFw6rMa8o9LJWRwd_xM84VmsWmQJq2lzy6tMROgIlnIX8gs9YJSuUpZZlof_oMw=w3440-h1313"
        ></meta>
        <meta
          name="description"
          content="Ми - колектив експертів у сфері штучного інтелекту, які працюють над створенням передових нейромережових технологій. Наша команда зосереджена на досягненні високих стандартів якості та інноваційності у таких областях, як розпізнавання образів, природна мова та автономні системи. Наша мета - революціонізувати технології, зробивши їх доступними та ефективними для всіх."
        />
        <meta
          property="og:description"
          content="Ми - колектив експертів у сфері штучного інтелекту, які працюють над створенням передових нейромережових технологій. Наша команда зосереджена на досягненні високих стандартів якості та інноваційності у таких областях, як розпізнавання образів, природна мова та автономні системи. Наша мета - революціонізувати технології, зробивши їх доступними та ефективними для всіх."
        />
        <meta property="og:image" content="https://i.ytimg.com/vi/fM8PQBn1VaQ/maxresdefault.jpg" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      {/* Metadata */}
      <ScrollToTop />
      <Header />
      <main>
        <div className="container">
          <h2 className="page-title">Про нас</h2>
          <div className="about-us-container">
            <Image src={about_us} alt="ai-go-logo" />
            <div className="text-container">
              <p className="description">
                Ми - це колектив експертів, що поєднує унікальні знання та пристрасну зацікавленість
                у сфері штучного інтелекту.
              </p>
              <p className="description">
                Прогтягом багатьох років ми працюємо над створенням інноваційних рішень, що
                використовують сучасні методи машинного навчання та глибокого навчання. Наша команда
                має глибокі знання у сферах комп'ютерної науки, математики, психології та інших
                галузей, які лежать в основі розвитку штучного інтелекту.
              </p>
              <p className="description">
                У "AI-Go" ми прагнемо досягти високих стандартів якості та інноваційності у всіх
                наших продуктах та послугах. Ми розвиваємо нейромережові рішення, спрямовані на
                вирішення складних завдань у таких сферах, як розпізнавання образів, природної мови,
                автономні системи та інше.
              </p>
              <p className="description">
                Наша мета - революціонізувати спосіб, яким люди взаємодіють з технологіями, зробивши
                їх більш доступними, ефективними та зручними для кожного. Ми віримо в силу інновацій
                та продовжуємо працювати для того, щоб змінювати світ за допомогою штучного
                інтелекту.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
