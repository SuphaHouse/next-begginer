'use client';
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ShoppingCart, MinusCircle } from "lucide-react";

function Productpage() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [product, setProduct] = useState({ id: crypto.randomUUID(), name: "", price: "", photo: "" });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.photo) {
      alert("Make sure you have filled in all fields before creating a product.");
      return;
    }
    setProducts((prev) => [...prev, { ...product, id: crypto.randomUUID() }]);
    setProduct({ name: "", price: "", photo: "" });
    setIsOpen(false);
  };

  const addToCart = (item) => setCart((prev) => [...prev, item]);

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const checkout = () => {
    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
    alert(`Total price: $${total}`);
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500 mt-1">
              Create and list products that customers can add to their cart and purchase.
            </p>
          </div>

          {/* Cart Icon + New Product Button next to each other */}
          <div className="flex items-center gap-1">
            {/* Cart Icon with Notification */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative border rounded-lg p-2 hover:bg-gray-50"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            {/* New Product Button */}
            <Button onClick={() => setIsOpen(true)}>New Product</Button>
          </div>
        </div>

        {/* New Product Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
              </DialogHeader>

              <FieldGroup>
                <Field>
                  <Label>Name</Label>
                  <Input
                    placeholder="e.g iPhone"
                    value={product.name}
                    onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                  />
                </Field>

                <Field>
                  <Label>Price</Label>
                  <Input
                    placeholder="e.g 500"
                    value={product.price}
                    onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))}
                  />
                </Field>
              
                <Field>
                  <Label>Image URL</Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={product.photo}
                    onChange={(e) => setProduct(prev => ({ ...prev, photo: e.target.value }))}
                  />
                </Field>
              </FieldGroup>

              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Cart Modal */}
        <Dialog open={cartOpen} onOpenChange={setCartOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Shopping Cart</DialogTitle>
            </DialogHeader>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <img src={item.photo} alt={item.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCartOpen(false)}>Cancel</Button>
              <Button type="button" onClick={checkout} disabled={cart.length === 0}>Checkout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {products.map((p) => (
            <div key={p.id} className="border rounded-2xl p-4 flex flex-col hover:shadow-sm transition">
              <img src={p.photo} alt={p.name} className="w-full h-48 object-cover rounded-lg mb-4 bg-gray-100" />
              <h2 className="font-medium text-sm text-gray-800">{p.name}</h2>
              <div className="flex justify-between items-center mt-3">
                <span className="font-semibold text-base">${p.price}</span>
                <Button size="sm" variant="secondary" onClick={() => addToCart(p)}>Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productpage;