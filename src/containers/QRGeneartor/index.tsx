import { FormGroup, TextField } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useSetState } from "react-use";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { EncodeParam, qrEncode } from "../../utils/qr";
import QrCodeWithLogo from "qrcode-with-logos";
import baseIcon from "../../assets/baseIcon.png";
import { head } from "ramda";

export const QRGenerator = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const fileFieldRef = React.useRef<HTMLInputElement>(null);

  const [customImg, setCustomImg] = useState<string | null>(null);
  const [state, setState] = useSetState<EncodeParam>({
    typeEn: "Stores/Shopping Malls",
    typeZh: "商店/商場",
    nameEn: "CityWalk",
    nameZh: "荃新天地",
    type: "IMPORT",
    venueCode: "0",
    venueID: "WHBvLDSa",
  });

  useEffect(() => {
    if (!imgRef.current) return;
    const encodedString = qrEncode(state);

    new QrCodeWithLogo({
      image: imgRef.current,
      content: encodedString,
      width: 380,
      logo: {
        src: customImg || baseIcon,
        logoRadius: 8,
        borderSize: 0,
      },
    }).toImage();
  }, [state, customImg]);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const img = head(files);
    if (!img) {
      setCustomImg(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => setCustomImg(String(reader.result));
    }
  };

  return (
    <PageWrapper>
      <Header backPath="/" name="生成二維碼" />
      <ContentWrapper>
        <StyledForm>
          <TextField
            label="場所種類(中文) (typeZh)"
            value={state.typeZh}
            onChange={(e) => {
              setState({ typeZh: e.target.value });
            }}
          />
          <TextField
            label="場所種類(英文) (typeEn)"
            value={state.typeEn}
            onChange={(e) => {
              setState({ typeEn: e.target.value });
            }}
          />
          <TextField
            label="場所名字(中文) (nameZh)"
            value={state.nameZh}
            onChange={(e) => {
              setState({ nameZh: e.target.value });
            }}
          />
          <TextField
            label="場所名字(英文) (nameEn)"
            value={state.nameEn}
            onChange={(e) => {
              setState({ nameEn: e.target.value });
            }}
          />
          <TextField
            label="類型"
            value={state.type}
            onChange={(e) => {
              setState({ type: e.target.value });
            }}
          />
          <TextField
            label="場地編碼 (唔知唔好搞)"
            value={state.venueCode}
            onChange={(e) => {
              setState({ venueCode: e.target.value });
            }}
          />
          <TextField
            label="場地ID (唔知唔好搞)"
            value={state.venueID}
            onChange={(e) => {
              setState({ venueID: e.target.value });
            }}
          />
          <StyledInputWrapper>
            <div>自定Icon</div>
            <StyledFileInput
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={fileFieldRef}
              onChange={handleFileSelected}
            />
          </StyledInputWrapper>
        </StyledForm>
        <StyledQrCode ref={imgRef} alt="qrCode" />
      </ContentWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const StyledForm = styled(FormGroup)`
  padding: 8px 16px;
`;

const StyledInputWrapper = styled.div`
  font-size: 12px;
  padding: 4px 0;
`;

const StyledFileInput = styled.input`
  padding: 4px 0;
`;

const StyledQrCode = styled.img`
  width: 100%;
`;