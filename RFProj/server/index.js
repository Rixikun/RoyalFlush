

const apiURL = 'https://api.yelp.com/v3/businesses/search?latitude=40.753705&longitude=-73.901621'

export async function getBusinesses(){
        const businesses = await fetch(apiURL)
        return businesses.json()
}