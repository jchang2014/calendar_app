class EventsController < ApplicationController
  def create
    event = Event.new
    event.title = params[:title]
    event.description = params[:description]
    event.moment = params[:moment]

    if event.save
      render json: {msg: "saved"}
    else
      render json: {msg: "error"}
    end
  end
end
