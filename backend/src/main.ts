import { NestFactory } from '@nestjs/core'
import { Body, Controller, Get, HttpException, HttpStatus, Module, Post, Req, UnauthorizedException } from '@nestjs/common'
import { createHmac, timingSafeEqual } from 'node:crypto'

type RequestLike = { headers: { authorization?: string } }

interface User { id: string; phone: string | null; name: string | null; createdAt: string }
interface Trip { id: string; userId: string; origin: string; destination: string; region: string; scheduledAt: string; status: string; createdAt: string }
const users: User[] = [
  { id: 'usr_demo_001', phone: '+852 5555 0101', name: 'Demo Rider', createdAt: '2026-08-22T09:30:00.000Z' },
  { id: 'usr_demo_002', phone: '+86 138 0000 0202', name: 'Alex Chen', createdAt: '2026-08-27T14:10:00.000Z' },
]
const trips: Trip[] = [
  { id: 'trip_demo_001', userId: 'usr_demo_001', origin: 'Hong Kong Airport', destination: 'Shenzhen Bay Port', region: 'GUANGDONG', scheduledAt: '2026-09-02T10:00:00.000Z', status: 'CONFIRMED', createdAt: '2026-09-01T08:00:00.000Z' },
  { id: 'trip_demo_002', userId: 'usr_demo_002', origin: 'Macau Ferry Terminal', destination: 'Zhuhai Gongbei', region: 'MACAU', scheduledAt: '2026-09-03T03:30:00.000Z', status: 'PENDING', createdAt: '2026-09-01T11:00:00.000Z' },
]
function secret() { return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '' }
function tokenFor(username: string) { const payload = Buffer.from(JSON.stringify({ sub: username, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString('base64url'); return `${payload}.${createHmac('sha256', secret()).update(payload).digest('base64url')}` }
function isValidToken(value?: string) { if (!value || !secret()) return false; const [payload, signature] = value.split('.'); if (!payload || !signature) return false; const expected = createHmac('sha256', secret()).update(payload).digest('base64url'); try { return timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) && JSON.parse(Buffer.from(payload, 'base64url').toString()).exp > Date.now() } catch { return false } }
function requireAuth(req: RequestLike) { if (!isValidToken(req.headers.authorization?.replace(/^Bearer\s+/i, ''))) throw new UnauthorizedException('Valid admin session required') }

@Controller('admin/auth')
class AdminAuthController {
  @Post('login') login(@Body() body: { username?: string; password?: string }) { const username = process.env.ADMIN_USERNAME; const password = process.env.ADMIN_PASSWORD; if (!username || !password) throw new HttpException('Admin credentials are not configured', HttpStatus.SERVICE_UNAVAILABLE); if (body.username !== username || body.password !== password) throw new UnauthorizedException('Invalid admin credentials'); return { token: tokenFor(username), expiresIn: 28800, username } }
  @Post('logout') logout() { return { ok: true } }
}
@Controller('admin')
class AdminController {
  @Get('dashboard') dashboard(@Req() req: RequestLike) { requireAuth(req); return { users: users.length, trips: trips.length, pendingTrips: trips.filter(t => t.status === 'PENDING').length, completedTrips: trips.filter(t => t.status === 'COMPLETED').length } }
  @Get('users') listUsers(@Req() req: RequestLike) { requireAuth(req); return { data: users, total: users.length } }
  @Get('trips') listTrips(@Req() req: RequestLike) { requireAuth(req); return { data: trips.map(t => ({ ...t, user: users.find(u => u.id === t.userId) || null })), total: trips.length } }
}
@Controller('settings')
class SettingsController {
  private settings = { language: '繁體中文', region: '香港', currency: 'HKD' }
  @Get() get() { return this.settings }
  @Post() update(@Body() body: { language?: string; region?: string; currency?: string }) {
    if (body.language) this.settings.language = body.language
    if (body.region) this.settings.region = body.region
    if (body.currency) this.settings.currency = body.currency
    return this.settings
  }
}
@Controller('location')
class LocationController {
  @Get('reverse-geocode')
  async reverseGeocode(@Req() req: RequestLike & { query?: { latitude?: string; longitude?: string } }) {
    const latitude = Number(req.query?.latitude)
    const longitude = Number(req.query?.longitude)
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      throw new HttpException('Valid latitude and longitude are required', HttpStatus.BAD_REQUEST)
    }
    const key = process.env.TENCENT_MAP_KEY
    if (!key) throw new HttpException('Tencent Location Service is not configured', HttpStatus.SERVICE_UNAVAILABLE)
    const params = new URLSearchParams({ location: `${latitude},${longitude}`, key, get_poi: '0' })
    const response = await fetch(`https://apis.map.qq.com/ws/geocoder/v1/?${params}`)
    const data = await response.json() as { status: number; message?: string; result?: { address?: string; formatted_addresses?: { recommend?: string }; address_component?: { city?: string; district?: string } } }
    if (!response.ok || data.status !== 0 || !data.result) {
      throw new HttpException(data.message || 'Unable to resolve location', HttpStatus.BAD_GATEWAY)
    }
    const component = data.result.address_component
    return {
      city: component?.city || component?.district || '',
      district: component?.district || '',
      address: data.result.formatted_addresses?.recommend || data.result.address || ''
    }
  }
}

@Controller('health') class HealthController { @Get() check() { return { status: 'ok', service: 'taxi-cross-border-api' } } }
@Module({ controllers: [HealthController, LocationController, SettingsController, AdminAuthController, AdminController] }) class AppModule {}
async function bootstrap() { const app = await NestFactory.create(AppModule); app.enableCors({ origin: [process.env.ADMIN_CORS_ORIGIN || 'http://localhost:5174', 'http://localhost:5177', 'http://127.0.0.1:5177'], methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }); await app.listen(Number(process.env.PORT) || 3000) }
bootstrap()
