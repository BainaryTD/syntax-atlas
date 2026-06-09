import pythonWeb from "@/content/web/python.json";
import javascriptWeb from "@/content/web/javascript.json";
import typescriptWeb from "@/content/web/typescript.json";
import goWeb from "@/content/web/go.json";
import rustWeb from "@/content/web/rust.json";
import javaWeb from "@/content/web/java.json";
import { languages } from "./content";
import type { Language } from "./types";

export type WebLibrary = {
  id: string;
  languageId: string;
  name: string;
  slug: string;
  category: string;
  version: string;
  url: string;
  tagline: string;
  description: string;
  code: string;
  structure: string;
  explanation: string;
  notes: string[];
};

export type WebLibraryWritingGuide = {
  keyFiles: { path: string; purpose: string }[];
  workflow: string[];
};

export const webLibraries = [
  ...pythonWeb,
  ...javascriptWeb,
  ...typescriptWeb,
  ...goWeb,
  ...rustWeb,
  ...javaWeb,
] as WebLibrary[];

export function getWebLibraryBySlug(slug: string) {
  return webLibraries.find((library) => library.slug === slug);
}

export function getWebLibrariesByLanguage(languageId: string) {
  return webLibraries.filter((library) => library.languageId === languageId);
}

export function getWebLibraryCount(languageId: string) {
  return getWebLibrariesByLanguage(languageId).length;
}

export function getWebLibrarySetupNote(library: WebLibrary) {
  return (
    library.notes.find((note) =>
      ["ติดตั้ง:", "เพิ่ม dependency:", "สร้างโปรเจกต์:", "ไม่ต้องติดตั้ง"].some((prefix) =>
        note.startsWith(prefix),
      ),
    ) ?? library.notes[0]
  );
}

const writingGuides: Record<string, WebLibraryWritingGuide> = {
  django: {
    keyFiles: [
      { path: "manage.py", purpose: "คำสั่งหลักของโปรเจกต์ เช่น runserver, migrate, createsuperuser" },
      { path: "mysite/settings.py", purpose: "ตั้งค่า database, installed apps, middleware และ static files" },
      { path: "mysite/urls.py", purpose: "route หลักของทั้งโปรเจกต์ มัก include route จากแต่ละ app" },
      { path: "blog/views.py", purpose: "เขียนฟังก์ชันหรือ class ที่รับ request แล้วคืน response" },
      { path: "blog/urls.py", purpose: "map URL ของ app ไปยัง view ที่ต้องการ" },
      { path: "blog/models.py", purpose: "นิยามตารางข้อมูลด้วย Django ORM" },
    ],
    workflow: [
      "สร้าง project ด้วย django-admin แล้วสร้าง app ย่อยสำหรับ feature เช่น blog หรือ users",
      "เขียน view ใน app/views.py ให้รับ request และคืน HttpResponse หรือ render template",
      "เพิ่ม route ใน app/urls.py แล้ว include เข้า project urls.py",
      "ถ้ามีข้อมูล ให้เขียน model แล้วรัน makemigrations และ migrate",
      "รัน python manage.py runserver แล้วเปิด URL ที่ map ไว้",
    ],
  },
  flask: {
    keyFiles: [
      { path: "app.py", purpose: "จุดเริ่มต้น สร้าง Flask app และประกาศ route" },
      { path: "requirements.txt", purpose: "รายการ package ที่ต้องติดตั้ง เช่น flask" },
      { path: "templates/", purpose: "ไฟล์ HTML ที่ render ด้วย Jinja2" },
      { path: "static/", purpose: "CSS, JavaScript และรูปภาพที่ browser โหลดตรง" },
    ],
    workflow: [
      "สร้าง app = Flask(__name__) ใน app.py",
      "ใช้ @app.get() หรือ @app.route() เพื่อผูก path กับฟังก์ชัน",
      "คืน string, dict, หรือ render_template() จากฟังก์ชัน route",
      "แยก templates/static เมื่อเริ่มมีหน้าเว็บจริง",
      "รัน flask --app app run --debug เพื่อดูผล",
    ],
  },
  fastapi: {
    keyFiles: [
      { path: "main.py", purpose: "สร้าง FastAPI app และ include router" },
      { path: "routers/", purpose: "แยก endpoint ตาม feature เช่น users/items" },
      { path: "models/", purpose: "Pydantic schema สำหรับ request/response validation" },
      { path: "requirements.txt", purpose: "package ที่ต้องติดตั้ง เช่น fastapi และ uvicorn" },
    ],
    workflow: [
      "สร้าง app = FastAPI() ใน main.py",
      "ประกาศ endpoint ด้วย @app.get(), @app.post() หรือแยก APIRouter",
      "ใส่ type hints/Pydantic model เพื่อ validate input และ response",
      "เปิด /docs เพื่อดูเอกสาร API ที่สร้างอัตโนมัติ",
      "รัน fastapi dev main.py หรือ uvicorn main:app --reload",
    ],
  },
  litestar: {
    keyFiles: [
      { path: "app.py", purpose: "สร้าง Litestar app และรวม route_handlers" },
      { path: "controllers/", purpose: "route handler หรือ controller แยกตาม feature" },
      { path: "schemas/", purpose: "DTO/schema สำหรับข้อมูลเข้าออก" },
      { path: "requirements.txt", purpose: "package ที่ต้องติดตั้ง เช่น litestar" },
    ],
    workflow: [
      "เขียน handler ด้วย decorator เช่น @get(\"/\")",
      "คืน dict หรือ object ที่ Litestar serialize เป็น response",
      "ส่ง handler เข้า route_handlers ตอนสร้าง Litestar app",
      "แยก controller/schema เมื่อ endpoint เริ่มเยอะ",
      "รัน litestar run --reload เพื่อเปิด dev server",
    ],
  },
  pyramid: {
    keyFiles: [
      { path: "development.ini", purpose: "config สำหรับ server และ environment ตอนพัฒนา" },
      { path: "myapp/__init__.py", purpose: "ตั้งค่า Configurator, route และ view registration" },
      { path: "myapp/views.py", purpose: "ฟังก์ชัน view ที่รับ request และคืน Response" },
      { path: "myapp/models.py", purpose: "model/ORM ตาม stack ที่เลือกใช้" },
    ],
    workflow: [
      "สร้าง Configurator แล้วเพิ่ม route ด้วย add_route()",
      "เขียน view function ที่รับ request",
      "ผูก view กับ route ด้วย add_view() หรือ decorator ตาม style ที่ใช้",
      "สร้าง WSGI app ด้วย make_wsgi_app()",
      "รันผ่าน pserve หรือคำสั่ง dev server ของ project",
    ],
  },
  express: {
    keyFiles: [
      { path: "package.json", purpose: "scripts และ dependency เช่น express" },
      { path: "index.js", purpose: "สร้าง express app, ใส่ middleware, register route และ listen" },
      { path: "routes/", purpose: "แยก route เป็นไฟล์ย่อยเมื่อ endpoint เยอะขึ้น" },
      { path: "public/", purpose: "ไฟล์ static ที่เสิร์ฟผ่าน express.static()" },
    ],
    workflow: [
      "import หรือ require express แล้วสร้าง app = express()",
      "ใส่ middleware เช่น express.json() ถ้ารับ JSON body",
      "ประกาศ route ด้วย app.get(), app.post(), app.use()",
      "ใน handler ใช้ req อ่าน request และ res ส่ง response",
      "เรียก app.listen(3000) แล้วรัน node index.js",
    ],
  },
  fastify: {
    keyFiles: [
      { path: "app.js", purpose: "สร้าง Fastify instance, register plugin/route และ listen" },
      { path: "routes/", purpose: "route plugin แยกตาม feature" },
      { path: "plugins/", purpose: "ของใช้ร่วม เช่น database, auth, logger" },
      { path: "package.json", purpose: "scripts และ dependency เช่น fastify" },
    ],
    workflow: [
      "สร้าง app = Fastify()",
      "ประกาศ route ด้วย app.get() หรือ app.route()",
      "คืน object จาก handler ได้เลย Fastify จะแปลงเป็น JSON",
      "เพิ่ม schema ถ้าต้อง validate request/response",
      "รัน app.listen({ port: 3000 })",
    ],
  },
  koa: {
    keyFiles: [
      { path: "index.js", purpose: "สร้าง Koa app, register middleware และ listen" },
      { path: "middleware/", purpose: "logic ที่ครอบ request เช่น logger, auth, error handling" },
      { path: "routes/", purpose: "route แยกด้วย @koa/router เมื่อไม่อยากเขียนทุกอย่างใน middleware เดียว" },
      { path: "package.json", purpose: "scripts และ dependency เช่น koa, @koa/router" },
    ],
    workflow: [
      "สร้าง app = new Koa()",
      "เขียน middleware ด้วย app.use(async (ctx, next) => ...)",
      "อ่าน request และส่ง response ผ่าน ctx",
      "เพิ่ม @koa/router ถ้าต้องการ route หลาย path",
      "เรียก app.listen(3000)",
    ],
  },
  adonisjs: {
    keyFiles: [
      { path: "start/routes.js", purpose: "ประกาศ route หลักของแอป" },
      { path: "app/controllers/", purpose: "controller ที่รับ request และคืน response" },
      { path: "app/models/", purpose: "Lucid ORM model สำหรับข้อมูล" },
      { path: "package.json", purpose: "scripts และ package ของ AdonisJS" },
    ],
    workflow: [
      "สร้าง project ด้วย npm init adonisjs@latest",
      "ประกาศ route ใน start/routes.js",
      "ย้าย logic ไป controller เมื่อ route เริ่มมีหลายบรรทัด",
      "ใช้ model/validator ตาม convention ของ AdonisJS",
      "รัน npm run dev เพื่อเปิด server",
    ],
  },
  nextjs: {
    keyFiles: [
      { path: "app/layout.tsx", purpose: "layout หลักที่ครอบทุกหน้า" },
      { path: "app/page.tsx", purpose: "หน้าแรกของ route /" },
      { path: "app/api/*/route.ts", purpose: "API endpoint ที่ export GET, POST, PUT หรือ DELETE" },
      { path: "next.config.ts", purpose: "ตั้งค่า Next.js เพิ่มเติม" },
    ],
    workflow: [
      "สร้างไฟล์ตาม route ที่ต้องการใต้ app/",
      "สำหรับหน้า UI ให้ export component จาก page.tsx",
      "สำหรับ API ให้สร้าง route.ts แล้ว export function ตาม HTTP method",
      "คืน Response หรือ Response.json() จาก route handler",
      "รัน npm run dev แล้วเปิด path ตามโฟลเดอร์ที่สร้าง",
    ],
  },
  nestjs: {
    keyFiles: [
      { path: "src/main.ts", purpose: "bootstrap Nest app และเปิด port" },
      { path: "src/app.module.ts", purpose: "รวม controller/provider/module ของ feature" },
      { path: "src/app.controller.ts", purpose: "ประกาศ route ด้วย decorator" },
      { path: "src/app.service.ts", purpose: "logic ทางธุรกิจที่ controller เรียกใช้" },
    ],
    workflow: [
      "สร้าง controller แล้วใช้ @Controller() กำหนด base path",
      "ใช้ @Get(), @Post() และ decorator อื่นเพื่อผูก route",
      "ย้าย logic ไป service แล้ว inject ผ่าน constructor",
      "ลงทะเบียน controller/provider ใน module",
      "รัน npm run start:dev",
    ],
  },
  hono: {
    keyFiles: [
      { path: "src/index.ts", purpose: "สร้าง Hono app, register route และ export/default" },
      { path: "src/routes/", purpose: "แยก route เป็น module ย่อย" },
      { path: "package.json", purpose: "runtime adapter และ scripts" },
      { path: "tsconfig.json", purpose: "ตั้งค่า TypeScript" },
    ],
    workflow: [
      "สร้าง app = new Hono()",
      "ประกาศ route ด้วย app.get(), app.post()",
      "ใช้ context c เพื่ออ่าน request และส่ง c.text(), c.json()",
      "แยก route ด้วย app.route() เมื่อ endpoint เยอะ",
      "export app ให้ runtime adapter นำไป serve",
    ],
  },
  elysia: {
    keyFiles: [
      { path: "src/index.ts", purpose: "สร้าง Elysia app, chain route และ listen" },
      { path: "src/routes/", purpose: "แยก route/plugin ตาม feature" },
      { path: "package.json", purpose: "scripts สำหรับ Bun และ dependency" },
      { path: "tsconfig.json", purpose: "ตั้งค่า TypeScript" },
    ],
    workflow: [
      "สร้าง new Elysia()",
      "chain route ด้วย .get(), .post() และคืน object/string จาก handler",
      "เพิ่ม schema/type เมื่อรับ params หรือ body",
      "แยก route เป็น plugin ถ้า feature ใหญ่ขึ้น",
      "เรียก .listen(3000) แล้วรันด้วย Bun",
    ],
  },
  "net-http": {
    keyFiles: [
      { path: "go.mod", purpose: "ชื่อ module และ dependency ของ Go project" },
      { path: "main.go", purpose: "จุดเริ่มต้น register handler และ ListenAndServe" },
      { path: "handlers/", purpose: "แยก handler function ออกจาก main.go" },
    ],
    workflow: [
      "เขียน handler ที่รับ http.ResponseWriter และ *http.Request",
      "ลงทะเบียน path ด้วย http.HandleFunc()",
      "เขียน response ผ่าน ResponseWriter",
      "แยก handler ไปโฟลเดอร์ handlers เมื่อ endpoint เยอะ",
      "รัน go run main.go",
    ],
  },
  gin: {
    keyFiles: [
      { path: "go.mod", purpose: "ชื่อ module และ dependency เช่น github.com/gin-gonic/gin" },
      { path: "main.go", purpose: "สร้าง Gin router และ Run server" },
      { path: "handlers/", purpose: "ฟังก์ชันที่รับ *gin.Context" },
      { path: "middleware/", purpose: "middleware เช่น auth/logging" },
    ],
    workflow: [
      "สร้าง router ด้วย gin.Default()",
      "ประกาศ route ด้วย r.GET(), r.POST()",
      "ใน handler ใช้ *gin.Context เพื่ออ่าน request และส่ง response",
      "ใช้ c.JSON() หรือ c.String() เพื่อคืนผลลัพธ์",
      "รัน r.Run(\":8080\")",
    ],
  },
  echo: {
    keyFiles: [
      { path: "go.mod", purpose: "ชื่อ module และ dependency เช่น github.com/labstack/echo/v4" },
      { path: "main.go", purpose: "สร้าง Echo instance และ Start server" },
      { path: "handler/", purpose: "handler ที่รับ echo.Context และคืน error" },
      { path: "middleware/", purpose: "middleware สำเร็จรูปหรือ custom middleware" },
    ],
    workflow: [
      "สร้าง e = echo.New()",
      "ประกาศ route ด้วย e.GET(), e.POST()",
      "handler รับ echo.Context และคืน error",
      "ใช้ c.String() หรือ c.JSON() เพื่อส่ง response",
      "รัน e.Start(\":8080\")",
    ],
  },
  chi: {
    keyFiles: [
      { path: "go.mod", purpose: "ชื่อ module และ dependency เช่น github.com/go-chi/chi/v5" },
      { path: "main.go", purpose: "สร้าง chi router และส่งให้ http.ListenAndServe" },
      { path: "routes/", purpose: "mount route ย่อยตาม feature" },
      { path: "middleware/", purpose: "middleware ที่เข้ากับ net/http" },
    ],
    workflow: [
      "สร้าง router ด้วย chi.NewRouter()",
      "ประกาศ route ด้วย r.Get(), r.Post()",
      "handler ใช้ signature แบบ net/http",
      "mount route ย่อยด้วย r.Route() หรือ r.Mount()",
      "ส่ง router เข้า http.ListenAndServe",
    ],
  },
  fiber: {
    keyFiles: [
      { path: "go.mod", purpose: "ชื่อ module และ dependency เช่น github.com/gofiber/fiber/v2" },
      { path: "main.go", purpose: "สร้าง Fiber app และ Listen server" },
      { path: "handlers/", purpose: "handler ที่รับ *fiber.Ctx" },
      { path: "middleware/", purpose: "middleware ของ Fiber" },
    ],
    workflow: [
      "สร้าง app = fiber.New()",
      "ประกาศ route ด้วย app.Get(), app.Post()",
      "handler รับ *fiber.Ctx และคืน error",
      "ใช้ c.SendString() หรือ c.JSON() เพื่อส่ง response",
      "รัน app.Listen(\":8080\")",
    ],
  },
  "actix-web": {
    keyFiles: [
      { path: "Cargo.toml", purpose: "dependency เช่น actix-web และ metadata ของ crate" },
      { path: "src/main.rs", purpose: "สร้าง HttpServer, register service และ run" },
      { path: "src/handlers.rs", purpose: "แยก handler function เมื่อ route เยอะขึ้น" },
    ],
    workflow: [
      "เพิ่ม dependency actix-web",
      "เขียน async handler และใช้ attribute เช่น #[get(\"/\")]",
      "ลงทะเบียน handler ด้วย App::new().service(handler)",
      "bind address แล้ว run server",
      "รัน cargo run",
    ],
  },
  axum: {
    keyFiles: [
      { path: "Cargo.toml", purpose: "dependency เช่น axum และ tokio" },
      { path: "src/main.rs", purpose: "สร้าง Router, bind listener และ serve" },
      { path: "src/routes.rs", purpose: "แยก route/handler ตาม feature" },
    ],
    workflow: [
      "เพิ่ม dependency axum และ tokio",
      "สร้าง Router::new()",
      "ผูก route ด้วย .route(\"/\", get(handler))",
      "bind TcpListener ผ่าน Tokio",
      "serve ด้วย axum::serve(listener, app)",
    ],
  },
  rocket: {
    keyFiles: [
      { path: "Cargo.toml", purpose: "dependency เช่น rocket" },
      { path: "src/main.rs", purpose: "ประกาศ route, mount และ launch" },
      { path: "src/routes.rs", purpose: "แยก route handlers เมื่อแอปใหญ่ขึ้น" },
    ],
    workflow: [
      "เพิ่ม dependency rocket",
      "ประกาศ handler ด้วย attribute เช่น #[get(\"/\")]",
      "mount route ด้วย rocket::build().mount()",
      "ใช้ routes![...] เพื่อรวม handler",
      "รัน cargo run",
    ],
  },
  warp: {
    keyFiles: [
      { path: "Cargo.toml", purpose: "dependency เช่น warp และ tokio" },
      { path: "src/main.rs", purpose: "compose filter และ serve" },
      { path: "src/filters.rs", purpose: "แยก filter ตาม feature" },
    ],
    workflow: [
      "เพิ่ม dependency warp และ tokio",
      "สร้าง filter เช่น warp::path::end()",
      "compose filter ด้วย map, and, or ตาม route ที่ต้องการ",
      "ส่ง filter เข้า warp::serve()",
      "รัน cargo run",
    ],
  },
  "spring-boot": {
    keyFiles: [
      { path: "pom.xml", purpose: "dependency เช่น spring-boot-starter-web และ build config" },
      { path: "src/main/java/.../App.java", purpose: "main class ที่ start SpringApplication" },
      { path: "controller/", purpose: "controller ที่ประกาศ endpoint ด้วย annotation" },
      { path: "application.properties", purpose: "ตั้งค่า port, database และ config อื่น" },
    ],
    workflow: [
      "สร้าง project แล้วเลือก Spring Web",
      "เขียน main class พร้อม @SpringBootApplication",
      "สร้าง controller และใช้ @RestController",
      "ผูก route ด้วย @GetMapping, @PostMapping",
      "รัน ./mvnw spring-boot:run",
    ],
  },
  javalin: {
    keyFiles: [
      { path: "pom.xml", purpose: "dependency เช่น io.javalin:javalin" },
      { path: "src/main/java/.../App.java", purpose: "สร้าง Javalin app และ start server" },
      { path: "controller/", purpose: "แยก route registration หรือ handler logic" },
    ],
    workflow: [
      "เพิ่ม Javalin dependency ใน Maven/Gradle",
      "สร้าง Javalin.create().start(port)",
      "ประกาศ route ด้วย app.get(), app.post()",
      "ใช้ ctx อ่าน request และส่ง response",
      "รัน main class",
    ],
  },
  quarkus: {
    keyFiles: [
      { path: "pom.xml", purpose: "dependency และ plugin ของ Quarkus" },
      { path: "GreetingResource.java", purpose: "REST resource ที่ประกาศ endpoint" },
      { path: "application.properties", purpose: "ตั้งค่า runtime และ extension" },
    ],
    workflow: [
      "สร้าง project ด้วย quarkus create app",
      "เขียน resource class แล้วใส่ @Path",
      "ใช้ @GET, @POST เพื่อผูก HTTP method",
      "คืน string/object จาก method เป็น response",
      "รัน ./mvnw quarkus:dev",
    ],
  },
  micronaut: {
    keyFiles: [
      { path: "build.gradle", purpose: "dependency และ build config" },
      { path: "Application.java", purpose: "main class ที่ start Micronaut" },
      { path: "HomeController.java", purpose: "controller ที่ประกาศ endpoint" },
      { path: "application.yml", purpose: "ตั้งค่า port และ config อื่น" },
    ],
    workflow: [
      "สร้าง project ด้วย Micronaut CLI",
      "เขียน controller แล้วใส่ @Controller",
      "ใช้ @Get, @Post เพื่อประกาศ endpoint",
      "คืน string/object จาก method เป็น response",
      "รัน ./gradlew run",
    ],
  },
};

export function getWebLibraryWritingGuide(library: WebLibrary): WebLibraryWritingGuide {
  return (
    writingGuides[library.id] ?? {
      keyFiles: [
        { path: "entry file", purpose: "ไฟล์เริ่มต้นที่สร้าง app และ register route" },
        { path: "routes/", purpose: "แยก endpoint ตาม feature" },
        { path: "config file", purpose: "ตั้งค่า dependency และ runtime" },
      ],
      workflow: [
        `ติดตั้งหรือสร้างโปรเจกต์ตาม note ของ ${library.name}`,
        "สร้าง app/server instance",
        "ประกาศ route แรกและคืน response ง่าย ๆ",
        "แยก route, handler และ config เมื่อโปรเจกต์เริ่มใหญ่ขึ้น",
      ],
    }
  );
}

// Group libraries under each language, keeping the language order from content.
// Languages with no web library yet are skipped.
export function groupWebLibrariesByLanguage(): { language: Language; libraries: WebLibrary[] }[] {
  return languages
    .map((language) => ({ language, libraries: getWebLibrariesByLanguage(language.id) }))
    .filter((group) => group.libraries.length > 0);
}
