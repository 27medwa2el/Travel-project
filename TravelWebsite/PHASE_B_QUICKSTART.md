# Phase B Quick Start Guide 🚀

Get started with the admin CRUD system in 5 minutes!

---

## ✅ What's Ready

- ✅ 4 admin CRUD pages (Countries, Cities, Activities, Drivers)
- ✅ Protected admin API routes
- ✅ Public API for travel integration
- ✅ Seed data (18 records across 4 entities)
- ✅ Complete documentation

---

## 🎬 Quick Start

### 1. Start the Dev Server

```bash
cd "D:\Work\Travel project\TravelWebsite"
npm run dev
```

### 2. Sign In to Admin

1. Navigate to: `http://localhost:3000/admin/sign-in`
2. Sign in with your Clerk account
3. You'll be redirected to the admin dashboard

### 3. Access CRUD Pages

In the sidebar, click **"Travel Data"** to see:
- **Countries** - `/admin/countries`
- **Cities** - `/admin/cities`
- **Activities** - `/admin/activities`
- **Drivers** - `/admin/drivers`

---

## 📝 Quick Test Workflow

### Create Your First Country

1. Go to **Countries** page
2. Click **"Add Country"**
3. Enter:
   - Name: `Spain`
   - Code: `ES`
4. Click **"Create"**
5. ✅ See it appear in the table

### Create a City

1. Go to **Cities** page
2. Click **"Add City"**
3. Enter:
   - Name: `Barcelona`
   - Country: Select `Spain` from dropdown
4. Click **"Create"**
5. ✅ See it appear with Spain as parent country

### Create an Activity

1. Go to **Activities** page
2. Click **"Add Activity"**
3. Enter:
   - Title: `Sagrada Familia Tour`
   - Description: `Visit Gaudí's masterpiece`
   - City: Select `Barcelona`
   - Price: `25`
   - Currency: `EUR`
   - Latitude: `41.4036`
   - Longitude: `2.1744`
   - Tags: `architecture, culture, landmark`
4. Click **"Create"**
5. ✅ See it in the table with Barcelona and pricing

### Test the Public API

Open a new browser tab or use curl:

```bash
# Get all activities
curl http://localhost:3000/api/public/activities

# Should return JSON including your new "Sagrada Familia Tour"
```

---

## 🎯 Key Features to Try

### Edit & Update
- Click the ✏️ (pencil) icon next to any record
- Modify fields
- Click "Update"
- Changes are saved immediately

### Delete
- Click the 🗑️ (trash) icon
- Confirm deletion
- Record is removed

### Referential Integrity
- Try deleting Spain (the country)
- You'll get an error: "Cannot delete country: 1 cities still reference it"
- Delete Barcelona first, then Spain will delete successfully

### Filtering
Try the public API with filters:

```bash
# Get activities in a specific city
curl "http://localhost:3000/api/public/activities?cityId=CITY_ID_HERE"

# Get activities by tags
curl "http://localhost:3000/api/public/activities?tags=outdoor,adventure"
```

---

## 📊 Seed Data (Pre-loaded)

The system comes with sample data:

**Countries**: USA, Canada, UK  
**Cities**: New York, Los Angeles, Toronto, Vancouver, London  
**Activities**: 6 popular tourist activities  
**Drivers**: 4 drivers across different cities

---

## 🐛 Troubleshooting

### "Unauthorized" Error
- **Solution**: Sign in at `/admin/sign-in` first
- Admin API routes require authentication

### "Failed to fetch data"
- **Solution**: Ensure dev server is running on port 3000
- Check terminal for errors

### Changes Not Appearing
- **Solution**: Refresh the page
- Data is in-memory, resets on server restart

### Cannot Delete Record
- **Solution**: Delete dependent records first
- Example: Delete cities before deleting countries

---

## 🔗 Useful URLs

| Page | URL |
|------|-----|
| **Admin Sign In** | `http://localhost:3000/admin/sign-in` |
| **Countries** | `http://localhost:3000/admin/countries` |
| **Cities** | `http://localhost:3000/admin/cities` |
| **Activities** | `http://localhost:3000/admin/activities` |
| **Drivers** | `http://localhost:3000/admin/drivers` |
| **Public API** | `http://localhost:3000/api/public/activities` |

---

## 💡 Tips

1. **Create in Order**: Country → City → Activity/Driver
2. **Use Seed Data**: 18 records already exist for testing
3. **Check Console**: Server logs show all operations
4. **Toast Notifications**: Green = success, Red = error
5. **Data Resets**: On server restart (it's in-memory)

---

## 📚 Next Steps

After testing the CRUD system:

1. **Integrate with Travel Pages** - See `PHASE_B_IMPLEMENTATION.md` for code examples
2. **Customize Seed Data** - Edit `src/lib/mockStore.ts` → `seedMockData()`
3. **Add More Fields** - Extend types in `src/types/domain.ts`
4. **Migrate to Prisma** - Follow the migration guide when ready for persistent storage

---

## ✅ Success Checklist

- [ ] Signed in to admin panel
- [ ] Created a country
- [ ] Created a city in that country
- [ ] Created an activity with lat/lng
- [ ] Created a driver
- [ ] Edited an existing record
- [ ] Deleted a record
- [ ] Tested referential integrity
- [ ] Called public API endpoint
- [ ] Saw toast notifications

---

**Ready to go!** 🎉

If you complete the checklist above, your Phase B implementation is working perfectly.

For detailed documentation, see:
- `PHASE_B_IMPLEMENTATION.md` - Complete technical guide
- `PHASE_B_SUMMARY.md` - Executive summary

---

*Quick Start Guide - Phase B*  
*Updated: January 12, 2026*
