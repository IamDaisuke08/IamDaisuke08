import { Injectable } from "@angular/core";
import { ApplicationItem } from "@models/applicationItem";
import { JobStatusItem } from "@models/jobStatusItem";
import { LocationItem } from "@models/locationItem";

@Injectable ({
    providedIn: 'root'
})
export class DummyService {
    getApplications() : ApplicationItem[] {
        return [
            new ApplicationItem(1, 'Test 1', 'Test Company 1', 1, 1, 'Test Data Only', new Date()),
            new ApplicationItem(2, 'Test 2', 'Test Company 2', 2, 2, 'Test Data Only', new Date()),
            new ApplicationItem(3, 'Test 3', 'Test Company 3', 3, 3, 'Test Data Only', new Date()),
        ];
    }

    getLocations() : LocationItem[] {
        let locations = [
            new LocationItem(1, 'Auckland', new Date()),
            new LocationItem(2, 'Wellington', new Date()),
            new LocationItem(3, 'Christchurch', new Date()),
            new LocationItem(4, 'Melbourne', new Date()),
            new LocationItem(5, 'Makati', new Date()),
            new LocationItem(6, 'BGC', new Date()),
        ];

        locations[0].lng = 174.7543261;
        locations[0].lat = -36.8496969;
        locations[0].zoom = 11;

        locations[1].lng = 174.7757234;
        locations[1].lat = -41.2925821;
        locations[1].zoom = 13;

        locations[2].lng = 172.6279471;
        locations[2].lat = -43.5349609;
        locations[2].zoom = 12;

        locations[3].lng = 144.9601532;
        locations[3].lat = -37.8172973;
        locations[3].zoom = 12;

        locations[4].lng = 121.0242645;
        locations[4].lat = 14.5548435;
        locations[4].zoom = 14;

        locations[5].lng = 121.0482233;
        locations[5].lat = 14.551541;
        locations[5].zoom = 15;

        return locations;
    }

    getStatus() : JobStatusItem[] {
        return [
            new JobStatusItem(1, 'Applied', new Date()),
            new JobStatusItem(2, 'Initial Interview', new Date()),
            new JobStatusItem(3, 'Second Interview', new Date()),
            new JobStatusItem(4, 'Rejected', new Date()),
            new JobStatusItem(5, 'Coding Exam', new Date()),
        ];
    }
}