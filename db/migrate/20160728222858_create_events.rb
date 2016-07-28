class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :moment, null: false
      t.string :title, null: false
      t.string :description
    end
  end
end
