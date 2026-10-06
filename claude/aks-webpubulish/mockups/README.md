# 수원 의정 아카이브 — 사이트 시안 3종

`upload/` 폴더의 PDF(『수원시의원으로 살다』 Ⅱ장)와 디자인 참고 이미지 3종(design1~3)을 바탕으로 만든 정적 HTML 시안입니다.

| 시안 | 폴더 | 참고 이미지 | 콘셉트 |
|---|---|---|---|
| A | `a/` | design1.jpeg | 컬러풀 에디토리얼 — 원색 원형·필 블록, 대형 영문 세리프 |
| B | `b/` | design2.jpeg | 클래식 세리프 카탈로그 — 크림 배경, 대형 워드마크, 보더 그리드 |
| C | `c/` | design3.jpeg | 파일 인덱스 탭 — 겹쳐진 폴더 탭, 종이 질감, 모노스페이스 |

각 시안의 구성: `index.html`(홈·히어로·검색) / `collection.html`(컬렉션·검색·필터·상세보기) / `exhibition.html`(디지털 전시) / `about.html`(소개) / `favicon.svg`

## 보는 방법
`claude/aks-webpubulish` 폴더에서 로컬 서버를 띄운 뒤 브라우저로 엽니다. (원문 PDF 링크가 `../upload/`를 가리키므로 이 위치에서 띄워야 합니다.)

```bash
cd claude/aks-webpubulish
python3 -m http.server 8000
# http://localhost:8000/mockups/
```

`mockups/index.html` 파일을 더블클릭해 바로 열어도 대부분 동작합니다.

## 공통 자산
- `assets/img/` — PDF에서 추출한 도판 11점 + 종이 질감 2점
- `assets/data.js` — 소장 자료 12건 메타데이터 (컬렉션·검색의 데이터 원본)
- `assets/app.js` — 검색·필터·상세 모달 공통 스크립트

자료를 추가하려면 `assets/data.js`에 항목을 추가하면 세 시안의 컬렉션에 모두 반영됩니다.
