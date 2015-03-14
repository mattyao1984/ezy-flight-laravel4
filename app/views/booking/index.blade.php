@extends('layouts.default')

@section('content')
<div class="page bookings" ng-controller="bookingsController">
  @include('partials.header')

  <div class="container">
    <div class="row loader" ng-show="!dataReady">
      <div class="col-xs-6 col-xs-offset-3">
        <img src="/images/loading-bookings.gif">
      </div>
    </div>

    <div class="row" ng-show="dataReady">
      <div class="col-xs-12">
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Time</th>
              <th>Capacity</th>
              <th>&nbsp;</th>
            </tr>
          </thead>

          <tbody>
            <tr ng-repeat="booking in allBookings | filter:seachBooking">
              <td>%% booking.source %%</td>
              <td>%% booking.destination %%</td>
              <td>%% booking.date %%</td>
              <td>%% booking.time %%</td>
              <td>%% booking.capacity %%</td>
              <td class="remove-wrap">
                <a class="remove-toggle" remove-toggle><i class="fa fa-ellipsis-v"></i></a>
                <ul class="booking-btns">
                  <li>
                    <div class="booking-btn edit-btn" ng-click="editFlight(booking.id)"><i class="fa fa-pencil-square-o pull-left"></i> Edit</div>
                  </li>
                  <li>
                    <div class="booking-btn remove-btn" ng-click="removeBooking(booking.id)"><i class="fa fa-trash-o pull-left"></i> Remove</div>
                  </li>
                </ul>
              </td>
            </tr>
          <tbody>
        </table>
      </div>
    </div>

    <div class="row" ng-show="dataReady">
      <div class="col-sm-3">
        <div class="select-wrap">
          <select name="sort-by" ng-model="filter" ng-change="sortBookings()">
              <option disabled selected value="all">SORT BY:</option>
              <option value="Source">By Source</option>
              <option value="Destination">By Destination</option>
              <option value="Datetime">By Datetime</option>
              <option value="Capacity">By Capacity</option>
          </select>
        </div>
      </div>

      <div class="col-sm-6 col-sm-offset-3">
        <input type="text" class="normal-input pull-right" ng-model="seachBooking" placeholder="Search Bookings..." />
      </div>
    </div>
  </div>

  <input type="hidden" ng-model="userId" ng-init="userId='{{ $user->id }}'" />
  <a class="add-flight round-btn" ng-click="addFlight()"><i class="fa fa-plus"></i></a>
  <ng-include src="'/templates/booking-modal.html'"></ng-include>
</div>
@stop