--
-- PostgreSQL database dump
--

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_clients (id, client_id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: -
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: next_auth; Owner: -
--

COPY next_auth.users (id, name, email, "emailVerified", image, password) FROM stdin;
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: next_auth; Owner: -
--

COPY next_auth.accounts (id, type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, oauth_token_secret, oauth_token, "userId") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, "emailVerified", image, password) FROM stdin;
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts (id, type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, oauth_token_secret, oauth_token, "userId") FROM stdin;
\.


--
-- Data for Name: email_verification_token; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_verification_token (expires_at, token, email, id) FROM stdin;
\.


--
-- Data for Name: forgot_password_token; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forgot_password_token (expires_at, token, email, id) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, slug, name, categoryimage, image, category, new, price, description, features, includes, gallery, others) FROM stdin;
fd93c412-1b5a-491b-bb4f-2d992d5f54f6	yx1-earphones	YX1 Wireless Earphones	{"mobile": "./assets/product-yx1-earphones/mobile/image-category-page-preview.jpg", "tablet": "./assets/product-yx1-earphones/tablet/image-category-page-preview.jpg", "desktop": "./assets/product-yx1-earphones/desktop/image-category-page-preview.jpg"}	{"mobile": "./assets/product-yx1-earphones/mobile/image-product.jpg", "tablet": "./assets/product-yx1-earphones/tablet/image-product.jpg", "desktop": "./assets/product-yx1-earphones/desktop/image-product.jpg"}	earphones	t	599	Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.	Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.\n\nThe YX1 Wireless Earphones features customizable controls for volume, music, calls, and voice assistants built into both earbuds. The new 7-hour battery life can be extended up to 28 hours with the charging case, giving you uninterrupted play time. Exquisite craftsmanship with a splash resistant design now available in an all new white and grey color scheme as well as the popular classic black.	[{"item": "Earphone unit", "quantity": 2}, {"item": "Multi-size earplugs", "quantity": 6}, {"item": "User manual", "quantity": 1}, {"item": "USB-C charging cable", "quantity": 1}, {"item": "Travel pouch", "quantity": 1}]	{"first": {"mobile": "./assets/product-yx1-earphones/mobile/image-gallery-1.jpg", "tablet": "./assets/product-yx1-earphones/tablet/image-gallery-1.jpg", "desktop": "./assets/product-yx1-earphones/desktop/image-gallery-1.jpg"}, "third": {"mobile": "./assets/product-yx1-earphones/mobile/image-gallery-3.jpg", "tablet": "./assets/product-yx1-earphones/tablet/image-gallery-3.jpg", "desktop": "./assets/product-yx1-earphones/desktop/image-gallery-3.jpg"}, "second": {"mobile": "./assets/product-yx1-earphones/mobile/image-gallery-2.jpg", "tablet": "./assets/product-yx1-earphones/tablet/image-gallery-2.jpg", "desktop": "./assets/product-yx1-earphones/desktop/image-gallery-2.jpg"}}	[{"name": "XX99 Mark I", "slug": "xx99-mark-one-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx99-mark-one-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx99-mark-one-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx99-mark-one-headphones.jpg"}}, {"name": "XX59", "slug": "xx59-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx59-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx59-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx59-headphones.jpg"}}, {"name": "ZX9 Speaker", "slug": "zx9-speaker", "image": {"mobile": "./assets/shared/mobile/image-zx9-speaker.jpg", "tablet": "./assets/shared/tablet/image-zx9-speaker.jpg", "desktop": "./assets/shared/desktop/image-zx9-speaker.jpg"}}]
f7628da6-301d-406f-8d14-57a6d9f15640	xx59-headphones	XX59 Headphones	{"mobile": "./assets/product-xx59-headphones/mobile/image-category-page-preview.jpg", "tablet": "./assets/product-xx59-headphones/tablet/image-category-page-preview.jpg", "desktop": "./assets/product-xx59-headphones/desktop/image-category-page-preview.jpg"}	{"mobile": "./assets/product-xx59-headphones/mobile/image-product.jpg", "tablet": "./assets/product-xx59-headphones/tablet/image-product.jpg", "desktop": "./assets/product-xx59-headphones/desktop/image-product.jpg"}	headphones	f	899	Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.	These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.\n\nMore than a simple pair of headphones, this headset features a pair of built-in microphones for clear, hands-free calling when paired with a compatible smartphone. Controlling music and calls is also intuitive thanks to easy-access touch buttons on the earcups. Regardless of how you use the XX59 headphones, you can do so all day thanks to an impressive 30-hour battery life that can be rapidly recharged via USB-C.	[{"item": "Headphone unit", "quantity": 1}, {"item": "Replacement earcups", "quantity": 2}, {"item": "User manual", "quantity": 1}, {"item": "3.5mm 5m audio cable", "quantity": 1}]	{"first": {"mobile": "./assets/product-xx59-headphones/mobile/image-gallery-1.jpg", "tablet": "./assets/product-xx59-headphones/tablet/image-gallery-1.jpg", "desktop": "./assets/product-xx59-headphones/desktop/image-gallery-1.jpg"}, "third": {"mobile": "./assets/product-xx59-headphones/mobile/image-gallery-3.jpg", "tablet": "./assets/product-xx59-headphones/tablet/image-gallery-3.jpg", "desktop": "./assets/product-xx59-headphones/desktop/image-gallery-3.jpg"}, "second": {"mobile": "./assets/product-xx59-headphones/mobile/image-gallery-2.jpg", "tablet": "./assets/product-xx59-headphones/tablet/image-gallery-2.jpg", "desktop": "./assets/product-xx59-headphones/desktop/image-gallery-2.jpg"}}	[{"name": "XX99 Mark II", "slug": "xx99-mark-two-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx99-mark-two-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx99-mark-two-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx99-mark-two-headphones.jpg"}}, {"name": "XX99 Mark I", "slug": "xx99-mark-one-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx99-mark-one-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx99-mark-one-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx99-mark-one-headphones.jpg"}}, {"name": "ZX9 Speaker", "slug": "zx9-speaker", "image": {"mobile": "./assets/shared/mobile/image-zx9-speaker.jpg", "tablet": "./assets/shared/tablet/image-zx9-speaker.jpg", "desktop": "./assets/shared/desktop/image-zx9-speaker.jpg"}}]
b854d616-cf35-4d5d-90d3-32f6ff653751	xx99-mark-one-headphones	XX99 Mark I Headphones	{"mobile": "./assets/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg", "tablet": "./assets/product-xx99-mark-one-headphones/tablet/image-category-page-preview.jpg", "desktop": "./assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg"}	{"mobile": "./assets/product-xx99-mark-one-headphones/mobile/image-product.jpg", "tablet": "./assets/product-xx99-mark-one-headphones/tablet/image-product.jpg", "desktop": "./assets/product-xx99-mark-one-headphones/desktop/image-product.jpg"}	headphones	f	1750	As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.	As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.\n\nFrom the handcrafted microfiber ear cushions to the robust metal headband with inner damping element, the components work together to deliver comfort and uncompromising sound. Its closed-back design delivers up to 27 dB of passive noise cancellation, reducing resonance by reflecting sound to a dedicated absorber. For connectivity, a specially tuned cable is includes with a balanced gold connector.	[{"item": "Headphone unit", "quantity": 1}, {"item": "Replacement earcups", "quantity": 2}, {"item": "User manual", "quantity": 1}, {"item": "3.5mm 5m audio cable", "quantity": 1}]	{"first": {"mobile": "./assets/product-xx99-mark-one-headphones/mobile/image-gallery-1.jpg", "tablet": "./assets/product-xx99-mark-one-headphones/tablet/image-gallery-1.jpg", "desktop": "./assets/product-xx99-mark-one-headphones/desktop/image-gallery-1.jpg"}, "third": {"mobile": "./assets/product-xx99-mark-one-headphones/mobile/image-gallery-3.jpg", "tablet": "./assets/product-xx99-mark-one-headphones/tablet/image-gallery-3.jpg", "desktop": "./assets/product-xx99-mark-one-headphones/desktop/image-gallery-3.jpg"}, "second": {"mobile": "./assets/product-xx99-mark-one-headphones/mobile/image-gallery-2.jpg", "tablet": "./assets/product-xx99-mark-one-headphones/tablet/image-gallery-2.jpg", "desktop": "./assets/product-xx99-mark-one-headphones/desktop/image-gallery-2.jpg"}}	[{"name": "XX99 Mark II", "slug": "xx99-mark-two-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx99-mark-two-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx99-mark-two-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx99-mark-two-headphones.jpg"}}, {"name": "XX59", "slug": "xx59-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx59-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx59-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx59-headphones.jpg"}}, {"name": "ZX9 Speaker", "slug": "zx9-speaker", "image": {"mobile": "./assets/shared/mobile/image-zx9-speaker.jpg", "tablet": "./assets/shared/tablet/image-zx9-speaker.jpg", "desktop": "./assets/shared/desktop/image-zx9-speaker.jpg"}}]
9536aa91-629a-44e6-8c3e-6bfbf6a139cd	xx99-mark-two-headphones	XX99 Mark II Headphones	{"mobile": "./assets/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg", "tablet": "./assets/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg", "desktop": "./assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg"}	{"mobile": "./assets/product-xx99-mark-two-headphones/mobile/image-product.jpg", "tablet": "./assets/product-xx99-mark-two-headphones/tablet/image-product.jpg", "desktop": "./assets/product-xx99-mark-two-headphones/desktop/image-product.jpg"}	headphones	t	2999	The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.	Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether youÔÇÖre taking a business call or just in your own personal space, the auto on/off and pause features ensure that youÔÇÖll never miss a beat.\n\nThe advanced Active Noise Cancellation with built-in equalizer allow you to experience your audio world on your terms. It lets you enjoy your audio in peace, but quickly interact with your surroundings when you need to. Combined with Bluetooth 5. 0 compliant connectivity and 17 hour battery life, the XX99 Mark II headphones gives you superior sound, cutting-edge technology, and a modern design aesthetic.	[{"item": "Headphone unit", "quantity": 1}, {"item": "Replacement earcups", "quantity": 2}, {"item": "User manual", "quantity": 1}, {"item": "3.5mm 5m audio cable", "quantity": 1}, {"item": "Travel bag", "quantity": 1}]	{"first": {"mobile": "./assets/product-xx99-mark-two-headphones/mobile/image-gallery-1.jpg", "tablet": "./assets/product-xx99-mark-two-headphones/tablet/image-gallery-1.jpg", "desktop": "./assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg"}, "third": {"mobile": "./assets/product-xx99-mark-two-headphones/mobile/image-gallery-3.jpg", "tablet": "./assets/product-xx99-mark-two-headphones/tablet/image-gallery-3.jpg", "desktop": "./assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg"}, "second": {"mobile": "./assets/product-xx99-mark-two-headphones/mobile/image-gallery-2.jpg", "tablet": "./assets/product-xx99-mark-two-headphones/tablet/image-gallery-2.jpg", "desktop": "./assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg"}}	[{"name": "XX99 Mark I", "slug": "xx99-mark-one-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx99-mark-one-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx99-mark-one-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx99-mark-one-headphones.jpg"}}, {"name": "XX59", "slug": "xx59-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx59-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx59-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx59-headphones.jpg"}}, {"name": "ZX9 Speaker", "slug": "zx9-speaker", "image": {"mobile": "./assets/shared/mobile/image-zx9-speaker.jpg", "tablet": "./assets/shared/tablet/image-zx9-speaker.jpg", "desktop": "./assets/shared/desktop/image-zx9-speaker.jpg"}}]
06a56e08-5221-44d0-b17d-4158da1efa84	zx7-speaker	ZX7 Speaker	{"mobile": "./assets/product-zx7-speaker/mobile/image-category-page-preview.jpg", "tablet": "./assets/product-zx7-speaker/tablet/image-category-page-preview.jpg", "desktop": "./assets/product-zx7-speaker/desktop/image-category-page-preview.jpg"}	{"mobile": "./assets/product-zx7-speaker/mobile/image-product.jpg", "tablet": "./assets/product-zx7-speaker/tablet/image-product.jpg", "desktop": "./assets/product-zx7-speaker/desktop/image-product.jpg"}	speakers	f	3500	Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.	Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.\n\nThe ZX7 speaker is the perfect blend of stylish design and high performance. It houses an encased MDF wooden enclosure which minimises acoustic resonance. Dual connectivity allows pairing through bluetooth or traditional optical and RCA input. Switch input sources and control volume at your finger tips with the included wireless remote. This versatile speaker is equipped to deliver an authentic listening experience.	[{"item": "Speaker unit", "quantity": 2}, {"item": "Speaker cloth panel", "quantity": 2}, {"item": "User manual", "quantity": 1}, {"item": "3.5mm 7.5m audio cable", "quantity": 1}, {"item": "7.5m optical cable", "quantity": 1}]	{"first": {"mobile": "./assets/product-zx7-speaker/mobile/image-gallery-1.jpg", "tablet": "./assets/product-zx7-speaker/tablet/image-gallery-1.jpg", "desktop": "./assets/product-zx7-speaker/desktop/image-gallery-1.jpg"}, "third": {"mobile": "./assets/product-zx7-speaker/mobile/image-gallery-3.jpg", "tablet": "./assets/product-zx7-speaker/tablet/image-gallery-3.jpg", "desktop": "./assets/product-zx7-speaker/desktop/image-gallery-3.jpg"}, "second": {"mobile": "./assets/product-zx7-speaker/mobile/image-gallery-2.jpg", "tablet": "./assets/product-zx7-speaker/tablet/image-gallery-2.jpg", "desktop": "./assets/product-zx7-speaker/desktop/image-gallery-2.jpg"}}	[{"name": "ZX9 Speaker", "slug": "zx9-speaker", "image": {"mobile": "./assets/shared/mobile/image-zx9-speaker.jpg", "tablet": "./assets/shared/tablet/image-zx9-speaker.jpg", "desktop": "./assets/shared/desktop/image-zx9-speaker.jpg"}}, {"name": "XX99 Mark I", "slug": "xx99-mark-one-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx99-mark-one-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx99-mark-one-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx99-mark-one-headphones.jpg"}}, {"name": "XX59", "slug": "xx59-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx59-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx59-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx59-headphones.jpg"}}]
4c755a6a-96c7-453c-a49a-f41817f4b409	zx9-speaker	ZX9 Speaker	{"mobile": "./assets/product-zx9-speaker/mobile/image-category-page-preview.jpg", "tablet": "./assets/product-zx9-speaker/tablet/image-category-page-preview.jpg", "desktop": "./assets/product-zx9-speaker/desktop/image-category-page-preview.jpg"}	{"mobile": "./assets/product-zx9-speaker/mobile/image-product.jpg", "tablet": "./assets/product-zx9-speaker/tablet/image-product.jpg", "desktop": "./assets/product-zx9-speaker/desktop/image-product.jpg"}	speakers	t	4500	Upgrade your sound system with the all new ZX9 active speaker. ItÔÇÖs a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.	Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and stereo XLR inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).\n\nDiscover clear, more natural sounding highs than the competition with ZX9ÔÇÖs signature planar diaphragm tweeter. Equally important is its powerful room-shaking bass courtesy of a 6.5ÔÇØ aluminum alloy bass unit. YouÔÇÖll be able to enjoy equal sound quality whether in a large room or small den. Furthermore, you will experience new sensations from old songs since it can respond to even the subtle waveforms.	[{"item": "Speaker unit", "quantity": 2}, {"item": "Speaker cloth panel", "quantity": 2}, {"item": "User manual", "quantity": 1}, {"item": "3.5mm 10m audio cable", "quantity": 1}, {"item": "10m optical cable", "quantity": 1}]	{"first": {"mobile": "./assets/product-zx9-speaker/mobile/image-gallery-1.jpg", "tablet": "./assets/product-zx9-speaker/tablet/image-gallery-1.jpg", "desktop": "./assets/product-zx9-speaker/desktop/image-gallery-1.jpg"}, "third": {"mobile": "./assets/product-zx9-speaker/mobile/image-gallery-3.jpg", "tablet": "./assets/product-zx9-speaker/tablet/image-gallery-3.jpg", "desktop": "./assets/product-zx9-speaker/desktop/image-gallery-3.jpg"}, "second": {"mobile": "./assets/product-zx9-speaker/mobile/image-gallery-2.jpg", "tablet": "./assets/product-zx9-speaker/tablet/image-gallery-2.jpg", "desktop": "./assets/product-zx9-speaker/desktop/image-gallery-2.jpg"}}	[{"name": "ZX7 Speaker", "slug": "zx7-speaker", "image": {"mobile": "./assets/shared/mobile/image-zx7-speaker.jpg", "tablet": "./assets/shared/tablet/image-zx7-speaker.jpg", "desktop": "./assets/shared/desktop/image-zx7-speaker.jpg"}}, {"name": "XX99 Mark I", "slug": "xx99-mark-one-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx99-mark-one-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx99-mark-one-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx99-mark-one-headphones.jpg"}}, {"name": "XX59", "slug": "xx59-headphones", "image": {"mobile": "./assets/shared/mobile/image-xx59-headphones.jpg", "tablet": "./assets/shared/tablet/image-xx59-headphones.jpg", "desktop": "./assets/shared/desktop/image-xx59-headphones.jpg"}}]
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-09-15 12:36:51
20211116045059	2025-09-15 12:36:54
20211116050929	2025-09-15 12:36:56
20211116051442	2025-09-15 12:36:58
20211116212300	2025-09-15 12:37:01
20211116213355	2025-09-15 12:37:03
20211116213934	2025-09-15 12:37:05
20211116214523	2025-09-15 12:37:08
20211122062447	2025-09-15 12:37:10
20211124070109	2025-09-15 12:37:12
20211202204204	2025-09-15 12:37:15
20211202204605	2025-09-15 12:37:17
20211210212804	2025-09-15 12:37:23
20211228014915	2025-09-15 12:37:26
20220107221237	2025-09-15 12:37:28
20220228202821	2025-09-15 12:37:30
20220312004840	2025-09-15 12:37:32
20220603231003	2025-09-15 12:37:35
20220603232444	2025-09-15 12:37:38
20220615214548	2025-09-15 12:37:40
20220712093339	2025-09-15 12:37:42
20220908172859	2025-09-15 12:37:44
20220916233421	2025-09-15 12:37:47
20230119133233	2025-09-15 12:37:49
20230128025114	2025-09-15 12:37:52
20230128025212	2025-09-15 12:37:54
20230227211149	2025-09-15 12:37:56
20230228184745	2025-09-15 12:37:58
20230308225145	2025-09-15 12:38:00
20230328144023	2025-09-15 12:38:02
20231018144023	2025-09-15 12:38:05
20231204144023	2025-09-15 12:38:08
20231204144024	2025-09-15 12:38:10
20231204144025	2025-09-15 12:38:13
20240108234812	2025-09-15 12:38:15
20240109165339	2025-09-15 12:38:17
20240227174441	2025-09-15 12:38:21
20240311171622	2025-09-15 12:38:24
20240321100241	2025-09-15 12:38:29
20240401105812	2025-09-15 12:38:35
20240418121054	2025-09-15 12:38:38
20240523004032	2025-09-15 12:38:46
20240618124746	2025-09-15 12:38:48
20240801235015	2025-09-15 12:38:50
20240805133720	2025-09-15 12:38:52
20240827160934	2025-09-15 12:38:54
20240919163303	2025-09-15 12:38:57
20240919163305	2025-09-15 12:38:59
20241019105805	2025-09-15 12:39:02
20241030150047	2025-09-15 12:39:10
20241108114728	2025-09-15 12:39:13
20241121104152	2025-09-15 12:39:15
20241130184212	2025-09-15 12:39:18
20241220035512	2025-09-15 12:39:20
20241220123912	2025-09-15 12:39:22
20241224161212	2025-09-15 12:39:24
20250107150512	2025-09-15 12:39:26
20250110162412	2025-09-15 12:39:28
20250123174212	2025-09-15 12:39:30
20250128220012	2025-09-15 12:39:33
20250506224012	2025-09-15 12:39:34
20250523164012	2025-09-15 12:39:36
20250714121412	2025-09-15 12:39:39
20250905041441	2025-09-30 14:29:48
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-09-15 12:36:47.417632
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-09-15 12:36:47.424103
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-09-15 12:36:47.432019
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-09-15 12:36:47.460881
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-09-15 12:36:47.518054
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-09-15 12:36:47.524017
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-09-15 12:36:47.545077
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-09-15 12:36:47.550671
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-09-15 12:36:47.55572
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-09-15 12:36:47.560861
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-09-15 12:36:47.568665
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-09-15 12:36:47.575074
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-09-15 12:36:47.58281
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-09-15 12:36:47.588686
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-09-15 12:36:47.594184
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-09-15 12:36:47.623567
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-09-15 12:36:47.630532
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-09-15 12:36:47.635785
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-09-15 12:36:47.641604
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-09-15 12:36:47.649094
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-09-15 12:36:47.655089
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-09-15 12:36:47.662676
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-09-15 12:36:47.684081
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-09-15 12:36:47.701253
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-09-15 12:36:47.708637
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-09-15 12:36:47.728515
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 1, false);


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: -
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

